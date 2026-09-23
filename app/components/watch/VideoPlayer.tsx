import { VideoPlayerProps } from "@/utils/types";

const VideoPlayer = ({ videoId }: VideoPlayerProps) => {
  return (
    <div className="aspect-video w-full overflow-hidden rounded-lg border border-[var(--hairline-strong)] bg-black">
      <iframe
        className="h-full w-full"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
};

export default VideoPlayer;
