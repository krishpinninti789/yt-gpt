import { getRelatedVideos } from "@/actions/videos.action";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const title = searchParams.get("title");
  const categoryId = searchParams.get("categoryId");
  const currentVideoId = searchParams.get("currentVideoId");
  const pageToken = searchParams.get("pageToken") ?? undefined;

  if (!title || !categoryId || !currentVideoId) {
    return NextResponse.json(
      {
        message: "title, categoryId and currentVideoId are required",
      },
      { status: 400 },
    );
  }

  try {
    const relatedVideos = await getRelatedVideos({
      title,
      categoryId,
      currentVideoId,
      pageToken,
    });

    return NextResponse.json(relatedVideos);
  } catch (error) {
    console.error("Failed to fetch related videos:", error);

    return NextResponse.json(
      {
        message: "Failed to fetch related videos",
      },
      { status: 500 },
    );
  }
}
