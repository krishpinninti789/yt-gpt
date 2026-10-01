"use client";

import ClearHistoryButton from "./ClearHistoryButton";
import HistoryVideoCard from "./HistoryVideoCard";
import { HistoryVideoListProps } from "@/utils/types";

const HistoryVideoList = ({
  videos,
  isLoading,
  onRemove,
  onClear,
}: HistoryVideoListProps) => {
  if (isLoading) {
    return (
      <div className="flex min-h-80 items-center justify-center">
        <p className="text-sm text-(--muted-copy)">Loading history...</p>
      </div>
    );
  }

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
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-foreground">
          Watch History
        </h1>

        <ClearHistoryButton onClear={onClear} />
      </div>

      <div className="flex flex-col gap-2">
        {videos.map((video) => (
          <HistoryVideoCard
            key={video.videoId}
            video={video}
            onRemove={onRemove}
          />
        ))}
      </div>
    </div>
  );
};

export default HistoryVideoList;
