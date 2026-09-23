import { Search } from "lucide-react";
const SearchBar = () => {
  return (
    <div className=" flex w-full items-center rounded-2xl border border-gray-500 bg-gray-900 p-2 sm:p-3 text-yellow-700 transition-all duration-300 ease-in-out focus-within:border-yellow-700 focus-within:ring-2 focus-within:ring-yellow-700 ">
      <input
        type="text"
        placeholder="Search"
        className=" min-w-0 flex-1 bg-transparent px-2 text-sm text-white placeholder:text-gray-500 focus:outline-none "
      />
      <button
        type="button"
        aria-label="Search"
        className=" shrink-0 rounded-full p-1.5 text-yellow-700 transition-colors hover:bg-gray-800 "
      >
        <Search className="h-5 w-5" />
      </button>
    </div>
  );
};
export default SearchBar;
