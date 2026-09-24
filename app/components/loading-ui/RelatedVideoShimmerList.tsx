import RelatedVideoCardShimmer from "./RelatedVideoCardShimmer";

const RelatedVideoShimmerList = () => {
  return (
    <div className="flex flex-col gap-2">
      {Array.from({ length: 4 }).map((_, index) => (
        <RelatedVideoCardShimmer key={index} />
      ))}
    </div>
  );
};

export default RelatedVideoShimmerList;
