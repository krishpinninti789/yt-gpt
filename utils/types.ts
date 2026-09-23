export type YouTubeVideo = {
  id: string;

  snippet: {
    title: string;
    channelTitle: string;
    publishedAt?: string;
    description?: string;
    categoryId?: string;

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

export type SidebarItem = {
  label: string;
  icon: React.ElementType;
  href?: string;
};

export type SidebarSection = {
  title?: string;
  items: SidebarItem[];
};

export type SideBarProps = {
  isExpanded: boolean;
};

export type HeaderProps = {
  onMenuClick?: () => void;
};

export type VideoContainerProps = {
  categoryId?: string;
};

export type GetVideosParams = {
  categoryId?: string;
  pageToken?: string;
};

export type InfiniteVideoListProps = {
  initialVideos: YouTubeVideo[];
  initialNextPageToken?: string;
  categoryId?: string;
};

export type WatchPageProps = {
  params: Promise<{
    videoId: string;
  }>;
};

export type VideoPlayerProps = {
  videoId: string;
};

export type VideoDescriptionProps = {
  video: YouTubeVideo;
};

export type GetRelatedVideosParams = {
  title: string;
  categoryId: string;
  currentVideoId: string;
};

export type YouTubeSearchResult = {
  kind: string;
  etag: string;
  id: {
    kind: string;
    videoId: string;
  };
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      default: {
        url: string;
        width: number;
        height: number;
      };
      medium: {
        url: string;
        width: number;
        height: number;
      };
      high: {
        url: string;
        width: number;
        height: number;
      };
    };
    channelTitle: string;
    liveBroadcastContent: string;
    publishTime: string;
  };
};

export type YouTubeSearchResponse = {
  kind: string;
  etag: string;
  nextPageToken?: string;
  regionCode: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: YouTubeSearchResult[];
};

export type RelatedVideoCardProps = {
  video: YouTubeSearchResult;
};

export type RelatedVideosProps = {
  videos: YouTubeSearchResult[];
};
