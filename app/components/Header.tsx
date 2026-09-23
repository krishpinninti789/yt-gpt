import { Menu, MonitorPlay, UserRound } from "lucide-react";
import Link from "next/link";

import SearchBar from "./SearchBar";
import { HeaderProps } from "@/utils/types";

const Header = ({ onMenuClick }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 flex h-16 w-full items-center justify-between gap-x-3 border-b border-[var(--hairline)] bg-[var(--background)] px-4 sm:px-6 md:h-20 md:px-8">
      <div className="flex shrink-0 items-center gap-x-2 sm:gap-x-4">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Toggle sidebar"
          className="rounded-lg p-2 text-[var(--muted-copy)] transition-colors duration-200 hover:bg-[var(--surface-elevated)] hover:text-[var(--foreground)]"
        >
          <Menu className="h-5 w-5 md:h-6 md:w-6" />
        </button>

        <Link href="/" className="flex shrink-0 items-center gap-x-2">
          <MonitorPlay className="h-7 w-7 text-[var(--accent)] md:h-8 md:w-8" />

          <h1 className="display-serif hidden text-xl text-[var(--foreground)] sm:block md:text-3xl">
            YT-
            <span className="text-[var(--accent)]">GPT</span>
          </h1>
        </Link>
      </div>

      <div className="min-w-0 flex-1 px-2 sm:px-4 md:max-w-2xl">
        <SearchBar />
      </div>

      <button
        type="button"
        aria-label="Account"
        className="rounded-lg p-2 text-[var(--muted-copy)] transition-colors hover:bg-[var(--surface-elevated)] hover:text-[var(--foreground)]"
      >
        <UserRound className="h-5 w-5 shrink-0 md:h-6 md:w-6" />
      </button>
    </header>
  );
};

export default Header;
