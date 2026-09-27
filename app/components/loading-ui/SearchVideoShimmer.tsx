const SearchVideoShimmer = () => {
  return (
    <div className="flex animate-pulse gap-4 rounded-xl p-2">
      {/* Thumbnail */}
      <div className="aspect-video w-72 shrink-0 rounded-xl bg-(--surface-elevated)" />

      {/* Content */}
      <div className="min-w-0 flex-1 py-1">
        {/* Title */}
        <div className="h-5 w-4/5 rounded bg-(--surface-elevated)" />
        <div className="mt-2 h-5 w-3/5 rounded bg-(--surface-elevated)" />

        {/* Channel */}
        <div className="mt-4 h-4 w-32 rounded bg-(--surface-elevated)" />

        {/* Description */}
        <div className="mt-4 h-4 w-full rounded bg-(--surface-elevated)" />
        <div className="mt-2 h-4 w-4/5 rounded bg-(--surface-elevated)" />
      </div>
    </div>
  );
};

export default SearchVideoShimmer;
