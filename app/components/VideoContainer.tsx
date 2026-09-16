import { getPopularVideos } from "@/actions/videos.action";
import React from "react";
import VideoCard from "./VideoCard";
import { YouTubeVideosResponse } from "@/utils/types";

const VideoContainer = async () => {
  const videosData = await getPopularVideos();

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
