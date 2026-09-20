import React from "react";
import { VideoContainerProps } from "@/utils/types";
import { getVideos } from "@/actions/videos.action";
import InfiniteVideoList from "./InfiniteVideoList";

const VideoContainer = async ({ categoryId }: VideoContainerProps) => {
  const videosData = await getVideos({ categoryId });

  return (
    <InfiniteVideoList
      key={categoryId ?? "all"}
      initialVideos={videosData.items}
      initialNextPageToken={videosData.nextPageToken}
      categoryId={categoryId}
    />
  );
};

export default VideoContainer;
