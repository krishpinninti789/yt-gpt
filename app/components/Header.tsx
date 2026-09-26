"use client";
import { Menu, MonitorPlay, StepBack, UserRound } from "lucide-react";
import Link from "next/link";

import SearchBar from "./SearchBar";
import { HeaderProps } from "@/utils/types";
import { usePathname } from "next/navigation";

const Header = ({ onMenuClick }: HeaderProps) => {
  const pathname = usePathname();

  const isWatchPage = pathname.startsWith("/watch");
  const isSearchPage = pathname.startsWith("/search");

  const getRenderableIcon =
    isWatchPage || isSearchPage ? (
      <StepBack className="h-5 w-5 md:h-6 md:w-6" />
    ) : (
      <Menu className="h-5 w-5 md:h-6 md:w-6" />
    );
  return (
    <header className="sticky top-0 z-50 flex h-16 w-full items-center justify-between gap-x-3 border-b border-(--hairline) bg-background px-4 sm:px-6 md:h-20 md:px-8">
      <div className="flex shrink-0 items-center gap-x-2 sm:gap-x-4">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label={isWatchPage ? "Go Back" : "Toggle sidebar"}
          className="rounded-lg p-2 text-(--muted-copy) transition-colors duration-200 hover:bg-(--surface-elevated) hover:text-foreground cursor-pointer"
        >
          {getRenderableIcon}
        </button>

        <Link href="/" className="flex shrink-0 items-center gap-x-2">
          <MonitorPlay className="h-7 w-7 text-(--accent) md:h-8 md:w-8" />

          <h1 className="display-serif hidden text-xl text-foreground sm:block md:text-3xl">
            YT-
            <span className="text-(--accent)">GPT</span>
          </h1>
        </Link>
      </div>

      <div className="min-w-0 flex-1 px-2 sm:px-4 md:max-w-2xl">
        <SearchBar />
      </div>

      <button
        type="button"
        aria-label="Account"
        className="rounded-lg p-2 text-(--muted-copy) transition-colors hover:bg-(--surface-elevated) hover:text-foreground"
      >
        <UserRound className="h-5 w-5 shrink-0 md:h-6 md:w-6" />
      </button>
    </header>
  );
};

export default Header;
