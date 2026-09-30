import { HistoryVideoCardProps } from "@/utils/types";
import Image from "next/image";
import Link from "next/link";

const HistoryVideoCard = ({ video }: HistoryVideoCardProps) => {
  return (
    <Link
      href={`/watch/${video.videoId}`}
      className="group flex gap-4 rounded-xl p-2 transition-colors hover:bg-(--surface-elevated)"
    >
      <div className="relative aspect-video w-48 shrink-0 overflow-hidden rounded-xl sm:w-56 md:w-72">
        <Image
          src={video.thumbnail}
          alt={video.title}
          fill
          sizes="(max-width: 640px) 192px, (max-width: 768px) 224px, 288px"
          className="object-cover transition-transform duration-200 group-hover:scale-105"
        />
      </div>

      <div className="min-w-0 flex-1 py-1">
        <h2 className="line-clamp-2 text-base font-semibold text-foreground">
          {video.title}
        </h2>

        <p className="mt-2 text-sm text-(--muted-copy)">{video.channelTitle}</p>

        {video.watchedAt && (
          <p className="mt-2 text-sm text-(--muted-copy)">
            Watched {new Date(video.watchedAt).toLocaleDateString()}
          </p>
        )}
      </div>
    </Link>
  );
};

export default HistoryVideoCard;
