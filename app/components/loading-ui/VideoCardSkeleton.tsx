const VideoCardSkeleton = () => {
  return (
    <div className="animate-pulse">
      {/* Thumbnail */}
      <div className="aspect-video w-full rounded-xl bg-gray-200" />

      {/* Video info */}
      <div className="mt-3 flex gap-3">
        {/* Channel avatar */}
        <div className="h-10 w-10 shrink-0 rounded-full bg-gray-200" />

        <div className="flex-1 space-y-2">
          {/* Title */}
          <div className="h-4 w-full rounded bg-gray-200" />
          <div className="h-4 w-3/4 rounded bg-gray-200" />

          {/* Channel + views */}
          <div className="h-3 w-1/2 rounded bg-gray-200" />
        </div>
      </div>
    </div>
  );
};

export default VideoCardSkeleton;
