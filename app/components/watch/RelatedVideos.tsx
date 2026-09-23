import { RelatedVideosProps } from "@/utils/types";
import RelatedVideoCard from "./RelatedVideoCard";

const RelatedVideos = ({ videos }: RelatedVideosProps) => {
  if (!videos.length) {
    return null;
  }

  return (
    <section>
      <h2 className="mb-4 text-lg font-semibold text-white">Related Videos</h2>

      <div className="flex flex-col gap-2">
        {videos.map((video) => (
          <RelatedVideoCard key={video.id.videoId} video={video} />
        ))}
      </div>
    </section>
  );
};

export default RelatedVideos;
