import VideoCardSkeleton from "./VideoCardSkeleton";

const VideoGridSkeleton = () => {
  return (
    <div className="grid grid-cols-3 gap-6 px-8 py-4">
      {Array.from({ length: 12 }).map((_, index) => (
        <VideoCardSkeleton key={index} />
      ))}
    </div>
  );
};

export default VideoGridSkeleton;
