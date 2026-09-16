export type YouTubeVideo = {
  id: string;

  snippet: {
    title: string;
    channelTitle: string;

    thumbnails: {
      medium?: {
        url: string;
        width: number;
        height: number;
      };

      high?: {
        url: string;
        width: number;
        height: number;
      };
    };
  };

  statistics?: {
    viewCount?: string;
  };
};

export type VideoCardProps = {
  videoData: YouTubeVideo;
};

export type YouTubeVideosResponse = {
  items: YouTubeVideo[];
  nextPageToken?: string;
};
