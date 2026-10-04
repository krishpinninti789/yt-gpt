import { fetchTranscript } from "youtube-transcript";

export async function getVideoTranscript(videoId: string) {
  const transcript = await fetchTranscript(videoId);

  return transcript.map((item) => ({
    text: item.text,
    offset: item.offset,
    duration: item.duration,
    lang: item.lang,
  }));
}
