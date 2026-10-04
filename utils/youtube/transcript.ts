type SupadataTranscriptItem = {
  text: string;
  offset: number;
  duration: number;
  lang?: string;
};

type SupadataTranscriptResponse = {
  lang?: string;
  availableLangs?: string[];
  content: SupadataTranscriptItem[];
};

export async function getVideoTranscript(videoId: string) {
  const apiKey = process.env.SUPADATA_API_KEY;

  if (!apiKey) {
    throw new Error("SUPADATA_API_KEY is not configured");
  }

  const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

  const response = await fetch(
    `https://api.supadata.ai/v1/transcript?url=${encodeURIComponent(videoUrl)}`,
    {
      headers: {
        "x-api-key": apiKey,
      },
    },
  );

  if (!response.ok) {
    const errorText = await response.text();

    throw new Error(
      `Supadata transcript API failed: ${response.status} ${errorText}`,
    );
  }

  const data: SupadataTranscriptResponse = await response.json();

  return data.content.map((item) => ({
    text: item.text,
    offset: item.offset,
    duration: item.duration,
    lang: item.lang ?? data.lang ?? "",
  }));
}
