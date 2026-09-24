const RelatedVideoCardShimmer = () => {
  return (
    <div className="flex animate-pulse gap-3 rounded-lg p-2">
      {/* Thumbnail */}
      <div className="aspect-video w-40 shrink-0 rounded-lg bg-gray-800" />

      {/* Content */}
      <div className="min-w-0 flex-1 py-1">
        <div className="mb-2 h-4 w-full rounded bg-gray-800" />
        <div className="mb-2 h-4 w-4/5 rounded bg-gray-800" />

        <div className="h-3 w-3/5 rounded bg-gray-800" />
      </div>
    </div>
  );
};

export default RelatedVideoCardShimmer;
