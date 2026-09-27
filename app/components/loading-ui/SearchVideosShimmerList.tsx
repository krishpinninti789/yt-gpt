import React from "react";
import SearchVideoShimmer from "./SearchVideoShimmer";

const SearchVideosShimmerList = () => {
  return (
    <div>
      {[0, 1, 2, 3].map(() => {
        return (
          <div className="flex flex-col gap-2">
            <SearchVideoShimmer />
          </div>
        );
      })}
    </div>
  );
};

export default SearchVideosShimmerList;
