import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "@/utils/db";
import { Question } from "@/utils/schema";
import { v4 as uuidv4 } from "uuid";
import { generateChatCompletion } from "@/utils/OpenAIModal";

export async function POST(request) {
  try {
    const { userId } = await auth();
    const user = await currentUser();

    if (!userId || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { jobPosition, jobDesc, jobExperience, typeQuestion, company } = body;

    if (!jobPosition || !jobDesc || !typeQuestion || !company) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const email = user.primaryEmailAddress?.emailAddress;

    const prompt = `
Given the following details:
- Job Position: ${jobPosition}
- Job Description: ${jobDesc}
- Years of Experience: ${jobExperience}
- Type of Question: ${typeQuestion}
- Previous Questions from this Company: ${company}

Please generate 5 interview questions relevant to the job position, experience level, and question type provided. Each question should be accompanied by a comprehensive answer. Return only a JSON array with "Question" and "Answer" as fields, no other text.

Example format:
[
  {
    "Question": "Your question here",
    "Answer": "The corresponding answer here"
  }
]
`;

    const responseText = await generateChatCompletion(prompt, {
      model: "gpt-4o-mini",
      temperature: 0.7,
      maxTokens: 2048,
    });

    const MockQuestionJsonResp = responseText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const mockId = uuidv4();

    await db.insert(Question).values({
      mockId,
      MockQuestionJsonResp,
      jobPosition,
      jobDesc,
      jobExperience: jobExperience?.toString() || "0",
      typeQuestion,
      company,
      createdBy: email,
      createdAt: new Date().toISOString().split("T")[0],
    });

    return NextResponse.json({ mockId });
  } catch (error) {
    console.error("[POST /api/questions]", error);
    return NextResponse.json({ error: "Failed to generate questions" }, { status: 500 });
  }
}
