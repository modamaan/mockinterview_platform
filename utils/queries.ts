import { cache } from "react";
import { db } from "./db";
import { auth } from "@clerk/nextjs/server";
import { MockInterview, UserAnswer } from "./schema";
import { eq } from "drizzle-orm";

// Fetches all interviews created by the authenticated user
export const getUserInterviews = cache(async () => {
  try {
    const { userId } = await auth();
    if (!userId) return null;

    const data = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.createdBy, userId));

    return data;
  } catch (error) {
    console.error("Error fetching user interviews:", error);
    throw error;
  }
});

// Fetches all answers for a given interview mockId
export const getInterviewAnswers = cache(async (mockId: string) => {
  try {
    const data = await db
      .select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef, mockId));

    return data;
  } catch (error) {
    console.error("Error fetching interview answers:", error);
    throw error;
  }
});
