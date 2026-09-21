import { Menu, MonitorPlay, UserRound } from "lucide-react";

import SearchBar from "./SearchBar";
import { HeaderProps } from "@/utils/types";
import Link from "next/link";

const Header = ({ onMenuClick }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 flex h-24 w-full items-center justify-between bg-black px-8">
      <div className="flex items-center gap-x-6">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Toggle sidebar"
          className="rounded-full p-2 text-white transition-colors duration-200 hover:bg-gray-800"
        >
          <Menu className="h-5 w-5" />
        </button>

        <Link className="flex items-center gap-x-2" href={"/"}>
          <MonitorPlay className="h-8 w-8 text-yellow-800" />

          <h1 className="text-3xl text-yellow-800">
            YT-
            <span className="text-white">GPT</span>
          </h1>
        </Link>
      </div>

      <SearchBar />

      <UserRound className="text-white" />
    </header>
  );
};

export default Header;
