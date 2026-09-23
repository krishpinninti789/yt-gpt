import { Menu, MonitorPlay, UserRound } from "lucide-react";
import Link from "next/link";

import SearchBar from "./SearchBar";
import { HeaderProps } from "@/utils/types";

const Header = ({ onMenuClick }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 flex h-16 w-full items-center justify-between gap-x-3 bg-black px-4 sm:px-6 md:h-20 md:px-8">
      <div className="flex shrink-0 items-center gap-x-2 sm:gap-x-4">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Toggle sidebar"
          className="rounded-full p-2 text-white transition-colors duration-200 hover:bg-gray-800"
        >
          <Menu className="h-5 w-5 md:h-6 md:w-6" />
        </button>

        <Link href="/" className="flex shrink-0 items-center gap-x-2">
          <MonitorPlay className="h-7 w-7 text-yellow-800 md:h-8 md:w-8" />

          <h1 className="hidden text-sm font-medium text-yellow-800 sm:block md:text-3xl">
            YT-
            <span className="text-white">GPT</span>
          </h1>
        </Link>
      </div>

      <div className="min-w-0 flex-1 px-2 sm:px-4 md:max-w-2xl">
        <SearchBar />
      </div>

      <UserRound className="h-5 w-5 shrink-0 text-white md:h-6 md:w-6" />
    </header>
  );
};

export default Header;
