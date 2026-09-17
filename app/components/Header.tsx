import { Menu, MonitorPlay, UserRound } from "lucide-react";
import React from "react";
import SearchBar from "./SearchBar";

const Header = () => {
  return (
    <div className="w-full z-10 sticky top-0 flex flex-row justify-between items-center px-8 py-4 border-b border-gray-800 bg-black">
      <div className="flex gap-x-6 justify-center items-center">
        <span>
          <Menu />
        </span>

        <div className="flex gap-x-2 justify-center items-center">
          <MonitorPlay className="text-yellow-800 w-8 h-8" />
          <h1 className="text-3xl text-yellow-800">
            YT-
            <span className="text-white">GPT</span>
          </h1>
        </div>
      </div>

      <SearchBar />
      <UserRound />
    </div>
  );
};

export default Header;
