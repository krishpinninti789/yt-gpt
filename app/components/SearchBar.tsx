import { Search, UserRound } from "lucide-react";
import React from "react";

const SearchBar = () => {
  return (
    <div
      className="flex items-center justify-center p-3 rounded-2xl border border-gray-500 focus:border-yellow-700  w-3xl focus:ring-2 focus:ring-yellow-800 bg-gray-900 placeholder:text-yellow-900 text-yellow-700 
        focus-within:ring-2
        focus-within:ring-yellow-700  transition-all
    duration-300
    ease-in-out"
    >
      <input
        placeholder="Search"
        className="w-3xl bg-gray-900 placeholder:text-yellow-900 text-yellow-700 focus:outline-none  transition-all
    duration-300
    ease-in-out"
      />
      <button className="cursor-pointer">
        <Search />
      </button>
    </div>
  );
};

export default SearchBar;
