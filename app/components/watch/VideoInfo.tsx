import { YouTubeVideo } from "@/utils/types";

type VideoInfoProps = {
  video: YouTubeVideo;
};

const VideoInfo = ({ video }: VideoInfoProps) => {
  const { snippet, statistics } = video;

  if (!snippet || !statistics) return null;

  return (
    <section className="mt-5">
      <h1 className="text-xl font-semibold text-white">{snippet.title}</h1>

      <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-gray-400">
        <span>{snippet.channelTitle}</span>

        <span>•</span>

        <span>{Number(statistics?.viewCount).toLocaleString()} views</span>

        <span>•</span>

        <span>
          {snippet.publishedAt
            ? new Date(snippet.publishedAt).toLocaleDateString()
            : "Unknown date"}
        </span>
      </div>
    </section>
  );
};

export default VideoInfo;
