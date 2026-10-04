import { YOUTUBE_API_BASE_URL } from "@/utils/constants";
import {
  GetRelatedVideosParams,
  GetSearchVideosParams,
  GetVideosParams,
  YouTubeSearchResponse,
  YouTubeVideosResponse,
} from "@/utils/types";

const EMPTY_VIDEOS_RESPONSE: YouTubeVideosResponse = { items: [] };
const EMPTY_SEARCH_RESPONSE: YouTubeSearchResponse = {
  kind: "youtube#searchListResponse",
  etag: "",
  regionCode: "",
  pageInfo: {
    totalResults: 0,
    resultsPerPage: 0,
  },
  items: [],
};

export async function getVideos({
  categoryId,
  pageToken,
}: GetVideosParams = {}): Promise<YouTubeVideosResponse> {
  try {
    const params = new URLSearchParams({
      part: "snippet,contentDetails,statistics",
      chart: "mostPopular",
      regionCode: "IN",
      maxResults: "20",
      key: process.env.YOUTUBE_API_KEY!,
    });

    if (categoryId) params.set("videoCategoryId", categoryId);
    if (pageToken) params.set("pageToken", pageToken);

    const response = await fetch(
      `${YOUTUBE_API_BASE_URL}/videos?${params.toString()}`,
    );

    if (!response.ok) throw new Error("Failed to fetch YouTube videos");

    return response.json();
  } catch (error) {
    console.error("YouTube videos API error:", error);
    return EMPTY_VIDEOS_RESPONSE;
  }
}

export async function getVideoDetails(
  videoId: string,
): Promise<YouTubeVideosResponse> {
  try {
    const params = new URLSearchParams({
      part: "snippet,contentDetails,statistics",
      id: videoId,
      key: process.env.YOUTUBE_API_KEY!,
    });

    const response = await fetch(
      `${YOUTUBE_API_BASE_URL}/videos?${params.toString()}`,
    );

    if (!response.ok) throw new Error("Failed to fetch video details");

    return response.json();
  } catch (error) {
    console.error("Video details API error:", error);
    return EMPTY_VIDEOS_RESPONSE;
  }
}

export async function getRelatedVideos({
  title,
  categoryId,
  currentVideoId,
  pageToken,
}: GetRelatedVideosParams): Promise<YouTubeSearchResponse> {
  try {
    const params = new URLSearchParams({
      part: "snippet",
      q: title,
      type: "video",
      videoCategoryId: categoryId,
      order: "relevance",
      regionCode: "IN",
      maxResults: "10",
      key: process.env.YOUTUBE_API_KEY!,
    });

    if (pageToken) params.set("pageToken", pageToken);

    const response = await fetch(
      `${YOUTUBE_API_BASE_URL}/search?${params.toString()}`,
    );

    if (!response.ok) throw new Error("Failed to fetch related videos");

    const data: YouTubeSearchResponse = await response.json();

    return {
      ...data,
      items: data.items.filter((item) => item.id.videoId !== currentVideoId),
    };
  } catch (error) {
    console.error("Related videos API error:", error);
    return EMPTY_SEARCH_RESPONSE;
  }
}

export async function getSearchVideos({
  query,
  pageToken,
  maxResults = 20,
}: GetSearchVideosParams): Promise<YouTubeSearchResponse> {
  try {
    const params = new URLSearchParams({
      part: "snippet",
      q: query,
      type: "video",
      regionCode: "IN",
      maxResults: String(maxResults),
      key: process.env.YOUTUBE_API_KEY!,
    });

    if (pageToken) params.set("pageToken", pageToken);

    const response = await fetch(
      `${YOUTUBE_API_BASE_URL}/search?${params.toString()}`,
    );

    if (!response.ok) throw new Error("Failed to search videos");

    return response.json();
  } catch (error) {
    console.error("Search videos API error:", error);
    return EMPTY_SEARCH_RESPONSE;
  }
}
