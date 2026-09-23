import Image from "next/image";
import Link from "next/link";
import { RelatedVideoCardProps } from "@/utils/types";

const RelatedVideoCard = ({ video }: RelatedVideoCardProps) => {
  const { videoId } = video.id;
  const { title, channelTitle, thumbnails } = video.snippet;

  return (
    <Link
      href={`/watch/${videoId}`}
      className="group flex gap-3 rounded-lg p-2 hover:bg-gray-900"
    >
      <div className="relative aspect-video w-40 shrink-0 overflow-hidden rounded-lg">
        <Image
          src={thumbnails.medium.url}
          alt={title}
          fill
          className="object-cover"
          sizes="160px"
        />
      </div>

      <div className="min-w-0">
        <h3 className="line-clamp-2 text-sm font-medium text-white">{title}</h3>

        <p className="mt-1 line-clamp-1 text-xs text-gray-400">
          {channelTitle}
        </p>
      </div>
    </Link>
  );
};

export default RelatedVideoCard;
