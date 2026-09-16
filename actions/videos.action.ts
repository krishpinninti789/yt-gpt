import { YOUTUBE_API_BASE_URL } from "@/utils/constants";
import { YouTubeVideo, YouTubeVideosResponse } from "@/utils/types";

export async function getPopularVideos(): Promise<YouTubeVideosResponse> {
  const params = new URLSearchParams({
    part: "snippet,contentDetails,statistics",
    chart: "mostPopular",
    regionCode: "IN",
    maxResults: "20",
    key: process.env.YOUTUBE_API_KEY!,
  });

  const response = await fetch(
    `${YOUTUBE_API_BASE_URL}/videos?${params.toString()}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch YouTube videos");
  }

  return response.json();
}
