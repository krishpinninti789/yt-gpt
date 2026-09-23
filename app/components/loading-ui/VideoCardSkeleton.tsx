const VideoCardSkeleton = () => {
  return (
    <div className="animate-pulse">
      {/* Thumbnail */}
      <div className="aspect-video w-full rounded-lg border border-[var(--hairline)] bg-[var(--surface-elevated)]" />

      {/* Video info */}
      <div className="mt-3 flex gap-3">
        {/* Channel avatar */}
        <div className="h-10 w-10 shrink-0 rounded-full bg-[var(--surface-elevated)]" />

        <div className="flex-1 space-y-2">
          {/* Title */}
          <div className="h-4 w-full rounded bg-[var(--surface-elevated)]" />
          <div className="h-4 w-3/4 rounded bg-[var(--surface-elevated)]" />

          {/* Channel + views */}
          <div className="h-3 w-1/2 rounded bg-[var(--surface-elevated)]" />
        </div>
      </div>
    </div>
  );
};

export default VideoCardSkeleton;
