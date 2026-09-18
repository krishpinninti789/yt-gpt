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
  onMenuClick: () => void;
};
