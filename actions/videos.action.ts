import { YOUTUBE_API_BASE_URL } from "@/utils/constants";
import { GetVideosParams, YouTubeVideosResponse } from "@/utils/types";

export async function getVideos({
  categoryId,
  pageToken,
}: GetVideosParams = {}): Promise<YouTubeVideosResponse> {
  const params = new URLSearchParams({
    part: "snippet,contentDetails,statistics",
    chart: "mostPopular",
    regionCode: "IN",
    maxResults: "20",
    key: process.env.YOUTUBE_API_KEY!,
  });

  if (categoryId) {
    params.set("videoCategoryId", categoryId);
  }

  if (pageToken) {
    params.set("pageToken", pageToken);
  }

  const response = await fetch(
    `${YOUTUBE_API_BASE_URL}/videos?${params.toString()}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch YouTube videos");
  }

  return response.json();
}

export async function getVideoDetails(
  videoId: string,
): Promise<YouTubeVideosResponse> {
  const params = new URLSearchParams({
    part: "snippet,contentDetails,statistics",
    id: videoId,
    key: process.env.YOUTUBE_API_KEY!,
  });

  const response = await fetch(
    `${YOUTUBE_API_BASE_URL}/videos?${params.toString()}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch video details");
  }

  return response.json();
}
