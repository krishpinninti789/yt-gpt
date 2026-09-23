import Image from "next/image";
import Link from "next/link";
import { RelatedVideoCardProps } from "@/utils/types";

const RelatedVideoCard = ({ video }: RelatedVideoCardProps) => {
  const { videoId } = video.id;
  const { title, channelTitle, thumbnails } = video.snippet;

  return (
    <Link
      href={`/watch/${videoId}`}
      className="group flex gap-3 rounded-lg border border-transparent p-2 transition-colors hover:border-[var(--hairline)] hover:bg-[var(--surface-card)]"
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
        <h3 className="line-clamp-2 text-sm font-medium text-[var(--foreground)] group-hover:text-[var(--accent)]">
          {title}
        </h3>

        <p className="mt-1 line-clamp-1 text-xs text-[var(--muted-copy)]">
          {channelTitle}
        </p>
      </div>
    </Link>
  );
};

export default RelatedVideoCard;
