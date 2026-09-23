import { getRelatedVideos, getVideoDetails } from "@/actions/videos.action";
import RelatedVideos from "@/app/components/watch/RelatedVideos";
import VideoDescription from "@/app/components/watch/VideoDescription";
import VideoInfo from "@/app/components/watch/VideoInfo";
import VideoPlayer from "@/app/components/watch/VideoPlayer";
import { WatchPageProps } from "@/utils/types";

const WatchPage = async ({ params }: WatchPageProps) => {
  const { videoId } = await params;

  const videosData = await getVideoDetails(videoId);

  const video = videosData.items[0];

  const relatedVideosData = await getRelatedVideos({
    title: video.snippet.title,
    categoryId: video.snippet.categoryId!,
    currentVideoId: video.id,
  });

  if (!video) {
    return null;
  }

  return (
    <div className="max-w-auto px-8 py-6">
      <div className="grid grid-cols-1 gap-8 xl:grid-cols-[1fr_380px]">
        <main>
          <VideoPlayer videoId={videoId} />
          <VideoInfo video={video} />
          <VideoDescription video={video} />
        </main>

        <aside>
          <RelatedVideos videos={relatedVideosData.items} />
        </aside>
      </div>
    </div>
  );
};

export default WatchPage;
