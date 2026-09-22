import { YouTubeVideo } from "@/utils/types";
import millify from "millify";
import VideoActions from "./VideoActions";

type VideoInfoProps = {
  video: YouTubeVideo;
};

const VideoInfo = ({ video }: VideoInfoProps) => {
  const { snippet, statistics } = video;

  if (!snippet || !statistics) return null;

  return (
    <section className="mt-5">
      <h1 className="text-xl font-semibold text-white">{snippet.title}</h1>
      <div className="flex justify-between">
        <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-gray-400">
          <span>{snippet.channelTitle}</span>

          <span>•</span>

          <span>{millify(Number(statistics.viewCount))} views</span>

          <span>•</span>

          <span>
            {snippet.publishedAt
              ? new Date(snippet.publishedAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
              : // "Sep 10, 2026"
                "Unknown date"}
          </span>
        </div>
        <VideoActions />
      </div>
    </section>
  );
};

export default VideoInfo;
