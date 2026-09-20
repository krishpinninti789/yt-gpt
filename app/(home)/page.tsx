import React from "react";
import VideoContainer from "../components/VideoContainer";
import { YOUTUBE_CATEGORY_IDS } from "@/utils/config/yt-category-config";

type PageProps = {
  searchParams: Promise<{
    category?: string;
  }>;
};

const page = async ({ searchParams }: PageProps) => {
  const { category } = await searchParams;

  const categoryId =
    category && category !== "all"
      ? YOUTUBE_CATEGORY_IDS[category as keyof typeof YOUTUBE_CATEGORY_IDS]
      : undefined;
  return <VideoContainer categoryId={categoryId} />;
};

export default page;
