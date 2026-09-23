import { RelatedVideosProps } from "@/utils/types";
import RelatedVideoCard from "./RelatedVideoCard";

const RelatedVideos = ({ videos }: RelatedVideosProps) => {
  if (!videos.length) {
    return null;
  }

  return (
    <section>
      <div className="mb-4 flex items-center gap-3">
        <span className="h-2 w-2 rounded-full bg-(--accent)" />
        <h2 className="text-lg font-medium text-foreground">Related videos</h2>
      </div>

      <div className="flex flex-col gap-2">
        {videos.map((video) => (
          <RelatedVideoCard key={video.id.videoId} video={video} />
        ))}
      </div>
    </section>
  );
};

export default RelatedVideos;
