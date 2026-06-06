import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import openai from "@/utils/OpenAIModal";

// POST /api/transcribe — transcribe audio blob via OpenAI Whisper
export async function POST(request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const audioFile = formData.get("audio");

    if (!audioFile) {
      return NextResponse.json({ error: "No audio file provided" }, { status: 400 });
    }

    // OpenAI Whisper requires a File-like object with a name and type
    const arrayBuffer = await audioFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Create a File blob that the OpenAI SDK can accept
    const file = new File([buffer], "recording.webm", { type: "audio/webm" });

    const transcriptionResponse = await openai.audio.transcriptions.create({
      file,
      model: "whisper-1",
      language: "en",
    });

    const transcription = transcriptionResponse.text?.trim() ?? "";
    return NextResponse.json({ transcription });
  } catch (error) {
    console.error("[POST /api/transcribe]", error);
    return NextResponse.json(
      { error: "Transcription failed. Please try again." },
      { status: 500 }
    );
  }
}
