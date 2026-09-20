import React from "react";
import VideoCard from "./VideoCard";
import { VideoContainerProps } from "@/utils/types";
import { getVideos } from "@/actions/videos.action";

const VideoContainer = async ({ categoryId }: VideoContainerProps) => {
  const videosData = await getVideos({ categoryId });

  return (
    <div className="px-8 py-4 grid grid-cols-3 gap-6">
      {videosData.items.map((video) => (
        <div key={video.id}>
          <VideoCard videoData={video} />
        </div>
      ))}
    </div>
  );
};

export default VideoContainer;
