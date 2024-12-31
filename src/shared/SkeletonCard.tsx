const SkeletonCard = () => {
  return (
    <div className="card glass w-80 animate-pulse">
      <div className="w-full h-60 bg-gray-300 rounded"></div>
      <div className="p-5 space-y-3">
        <div className="h-6 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        <div className="flex justify-between">
          <div className="h-4 bg-gray-300 rounded w-1/3"></div>
          <div className="h-4 bg-gray-300 rounded w-1/4"></div>
        </div>
        <div className="h-10 bg-gray-300 rounded mt-3"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;
