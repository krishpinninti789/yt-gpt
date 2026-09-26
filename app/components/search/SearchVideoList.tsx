import { YouTubeSearchResult } from "@/utils/types";
import SearchVideoCard from "./SearchVideoCard";

type SearchVideoListProps = {
  videos: YouTubeSearchResult[];
};

const SearchVideoList = ({ videos }: SearchVideoListProps) => {
  if (!videos.length) {
    return (
      <div className="flex min-h-80 items-center justify-center">
        <p className="text-(--muted-copy)">No videos found.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {videos.map((video) => (
        <SearchVideoCard key={video.id.videoId} video={video} />
      ))}
    </div>
  );
};

export default SearchVideoList;
