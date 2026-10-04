import { YouTubeSearchResult } from "@/utils/types";
import SearchVideoCard from "./SearchVideoCard";

type SearchVideoListProps = {
  videos: YouTubeSearchResult[];
};

const SearchVideoList = ({ videos }: SearchVideoListProps) => {
  if (videos.length === 0) {
    return null;
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
