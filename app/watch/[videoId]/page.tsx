import { getVideoDetails } from "@/actions/videos.action";
import VideoInfo from "@/app/components/watch/VideoInfo";
import VideoPlayer from "@/app/components/watch/VideoPlayer";
import { WatchPageProps } from "@/utils/types";

const WatchPage = async ({ params }: WatchPageProps) => {
  const { videoId } = await params;

  const videosData = await getVideoDetails(videoId);

  const video = videosData.items[0];

  if (!video) {
    return null;
  }

  return (
    <div className="max-w-7xl px-8 py-6">
      <div className="grid grid-cols-1 gap-8 xl:grid-cols-[1fr_380px]">
        <main>
          <VideoPlayer videoId={videoId} />
          <VideoInfo video={video} />
        </main>

        <aside>{/* Related videos will come here */}</aside>
      </div>
    </div>
  );
};

export default WatchPage;
