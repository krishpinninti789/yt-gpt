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
    <section className="mt-6 border-b border-[var(--hairline)] pb-5">
      <h1 className="display-serif text-2xl leading-tight text-[var(--foreground)] md:text-3xl">
        {snippet.title}
      </h1>

      <div className="mt-3 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-2 text-sm text-[var(--muted-copy)] sm:gap-3">
          <span className="truncate">{snippet.channelTitle}</span>

          <span className="text-[var(--accent)]">/</span>

          <span>{millify(Number(statistics.viewCount))} views</span>

          <span className="text-[var(--accent)]">/</span>

          <span>
            {snippet.publishedAt
              ? new Date(snippet.publishedAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
              : "Unknown date"}
          </span>
        </div>

        <VideoActions />
      </div>
    </section>
  );
};

export default VideoInfo;
