import { HistoryVideoListProps } from "@/utils/types";
import HistoryVideoCard from "./HistoryVideoCard";

const HistoryVideoList = ({ videos }: HistoryVideoListProps) => {
  if (!videos.length) {
    return (
      <div className="flex min-h-80 items-center justify-center">
        <div className="text-center">
          <h2 className="text-lg font-semibold text-foreground">
            No watch history
          </h2>

          <p className="mt-2 text-sm text-(--muted-copy)">
            Videos you watch will appear here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 p-8">
      {videos.map((video) => (
        <HistoryVideoCard key={video.videoId} video={video} />
      ))}
    </div>
  );
};

export default HistoryVideoList;
