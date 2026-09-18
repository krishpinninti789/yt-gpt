import {
  Home,
  PlaySquare,
  Clock3,
  History,
  ThumbsUp,
  ListVideo,
  Menu,
  MonitorPlay,
} from "lucide-react";
import { SidebarSection } from "../types";

export const SIDEBAR_CONFIG: SidebarSection[] = [
  {
    items: [
      {
        label: "Home",
        icon: Home,
        href: "/",
      },
      {
        label: "Shorts",
        icon: PlaySquare,
        href: "/shorts",
      },
      {
        label: "Subscriptions",
        icon: MonitorPlay,
        href: "/subscriptions",
      },
    ],
  },
  {
    title: "You",
    items: [
      {
        label: "History",
        icon: History,
        href: "/history",
      },
      {
        label: "Playlists",
        icon: ListVideo,
        href: "/playlists",
      },
      {
        label: "Watch later",
        icon: Clock3,
        href: "/watch-later",
      },
      {
        label: "Liked videos",
        icon: ThumbsUp,
        href: "/liked",
      },
    ],
  },
];
