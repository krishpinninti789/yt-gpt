import { MonitorPlay } from "lucide-react";
import React from "react";
import SearchBar from "./SearchBar";

const Header = () => {
  return (
    <div className="w-full z-10 sticky top-0 flex flex-row gap-x-64 px-8 py-4 border-b border-gray-800 bg-black">
      <div className="flex gap-x-2 justify-center items-center">
        <MonitorPlay className="text-yellow-800 w-8 h-8" />
        <h1 className="text-3xl text-yellow-800">
          YT-
          <span className="text-white">GPT</span>
        </h1>
      </div>

      <SearchBar />
    </div>
  );
};

export default Header;
