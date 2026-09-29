import React from "react";
import SearchVideoShimmer from "./SearchVideoShimmer";

const SearchVideosShimmerList = () => {
  return (
    <div>
      {[0, 1, 2, 3].map((index) => {
        return (
          <div className="flex flex-col gap-2" key={index}>
            <SearchVideoShimmer />
          </div>
        );
      })}
    </div>
  );
};

export default SearchVideosShimmerList;
