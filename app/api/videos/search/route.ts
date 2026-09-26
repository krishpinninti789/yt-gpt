import { getSearchVideos } from "@/actions/videos.action";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("q")!;
  const pageToken = searchParams.get("pageToken") ?? undefined;

  try {
    if (!query) {
      return NextResponse.json(
        {
          message: "Query is required",
        },
        { status: 400 },
      );
    }
    const searchVideos = await getSearchVideos({
      query,
      pageToken,
    });
    return NextResponse.json(searchVideos);
  } catch (err) {
    NextResponse.json({
      status: 500,
      message: err,
    });
  }
}
