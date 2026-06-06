import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "@/utils/db";
import { MockInterview, UserAnswer } from "@/utils/schema";
import { eq, and } from "drizzle-orm";

// GET /api/interviews/[id] — fetch a single interview by ID (auth-gated)
export async function GET(request, { params }) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;
    if (!id) {
      return NextResponse.json({ error: "Interview ID is required" }, { status: 400 });
    }

    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, id));

    if (!result || result.length === 0) {
      return NextResponse.json({ error: "Interview not found" }, { status: 404 });
    }

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error("[GET /api/interviews/[id]]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// DELETE /api/interviews/[id] — delete interview + all its answers (owner only)
export async function DELETE(request, { params }) {
  try {
    const { userId } = await auth();
    const user = await currentUser();
    if (!userId || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;
    if (!id) {
      return NextResponse.json({ error: "Interview ID is required" }, { status: 400 });
    }

    const userEmail = user.primaryEmailAddress?.emailAddress ?? "";

    // Verify ownership before deleting
    const existing = await db
      .select()
      .from(MockInterview)
      .where(and(eq(MockInterview.mockId, id), eq(MockInterview.createdBy, userEmail)));

    if (!existing || existing.length === 0) {
      return NextResponse.json(
        { error: "Interview not found or you don't have permission to delete it." },
        { status: 404 }
      );
    }

    // Delete all answers for this interview first (no cascade set up)
    await db.delete(UserAnswer).where(eq(UserAnswer.mockIdRef, id));

    // Delete the interview itself
    await db.delete(MockInterview).where(eq(MockInterview.mockId, id));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[DELETE /api/interviews/[id]]", error);
    return NextResponse.json({ error: "Failed to delete interview." }, { status: 500 });
  }
}
