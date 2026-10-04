import { NextResponse } from "next/server";
import { gemini } from "@/utils/ai/gemini";
import { getVideoTranscript } from "@/utils/youtube/transcript";

export async function POST(request: Request) {
  try {
    const { videoId, question } = await request.json();

    if (!videoId || !question?.trim()) {
      return NextResponse.json(
        {
          success: false,
          error: "videoId and question are required",
        },
        { status: 400 },
      );
    }

    let transcript;

    try {
      transcript = await getVideoTranscript(videoId);
    } catch (error) {
      console.error("Transcript error:", error);

      return NextResponse.json(
        {
          success: false,
          code: "TRANSCRIPT_UNAVAILABLE",
          error:
            "Vidora AI can't understand this video because a transcript isn't available.",
        },
        { status: 422 },
      );
    }

    const transcriptText = transcript.map((item) => item.text).join(" ");

    const prompt = `
You are Vidora AI, an assistant that helps users understand YouTube videos.

Answer the user's question using ONLY the provided video transcript.

If the transcript does not contain enough information to answer the question,
clearly say that the information is not available in the transcript.

Keep the answer clear and easy to understand.

Video transcript:
${transcriptText}

User question:
${question}
`;

    const interaction = await gemini.interactions.create({
      agent: "antigravity-preview-09-2026",
      input: prompt,
      environment: "remote",
    });

    return NextResponse.json({
      success: true,
      response: interaction.output_text,
      interactionId: interaction.id,
    });
  } catch (error) {
    console.error("Vidora AI error:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to generate AI response",
      },
      { status: 500 },
    );
  }
}
