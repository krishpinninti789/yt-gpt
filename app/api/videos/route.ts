import { getVideos } from "@/actions/videos.action";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const categoryId = searchParams.get("categoryId") ?? undefined;
  const pageToken = searchParams.get("pageToken") ?? undefined;

  try {
    const videosData = await getVideos({
      categoryId,
      pageToken,
    });

    return NextResponse.json(videosData);
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to fetch videos",
      },
      {
        status: 500,
      },
    );
  }
}
