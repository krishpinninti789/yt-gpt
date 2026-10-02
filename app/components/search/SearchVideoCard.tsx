import Image from "next/image";
import Link from "next/link";
import { YouTubeSearchResult } from "@/utils/types";

type SearchVideoCardProps = {
  video: YouTubeSearchResult;
};

const SearchVideoCard = ({ video }: SearchVideoCardProps) => {
  const { videoId } = video.id;
  const { title, channelTitle, thumbnails, publishTime, description } =
    video.snippet;
  console.log(video);

  return (
    <Link
      href={`/watch/${videoId}`}
      className="group flex flex-col md:flex-row gap-4 rounded-xl p-2 transition-colors hover:bg-(--surface-elevated)"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video w-full md:w-72 shrink-0 overflow-hidden rounded-xl">
        <Image
          src={thumbnails.high.url}
          alt={title}
          fill
          className="object-cover transition-transform duration-200 group-hover:scale-105"
          sizes="288px"
        />
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1 py-1">
        <h2 className="line-clamp-2 text-base font-semibold text-foreground">
          {title}
        </h2>

        <div className="flex flex-row gap-x-4">
          <p className="mt-2 text-sm text-(--muted-copy)">{channelTitle}</p>
          <p className="mt-2 text-sm text-(--muted-copy)">{publishTime}</p>
        </div>

        <p className="mt-2 line-clamp-2 text-sm text-(--muted-copy) hidden md:block">
          {description}
        </p>
      </div>
    </Link>
  );
};

export default SearchVideoCard;
