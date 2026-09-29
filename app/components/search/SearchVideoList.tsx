import { YouTubeSearchResult } from "@/utils/types";
import SearchVideoCard from "./SearchVideoCard";

type SearchVideoListProps = {
  videos: YouTubeSearchResult[];
};

const SearchVideoList = ({ videos }: SearchVideoListProps) => {
  return (
    <div className="flex flex-col gap-2">
      {videos.map((video) => (
        <SearchVideoCard key={video.id.videoId} video={video} />
      ))}
    </div>
  );
};

export default SearchVideoList;
