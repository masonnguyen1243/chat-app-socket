const MessageSkeleton = () => {
  const skeletonMessages = Array(6).fill(null);

  return (
    <>
      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        {skeletonMessages.map((_, index) => {
          return (
            <div
              key={index}
              className={`flex items-start gap-3 ${index % 2 === 0 ? "justify-start" : "flex-row justify-end"}`}
            >
              {/* Avatar */}
              <div className="h-10 w-10 animate-pulse rounded-full bg-gray-100" />

              {/* Message bubble */}
              <div className="mb-2 h-4 w-16 animate-pulse rounded bg-gray-300" />
              <div className="h-16 w-[200px] animate-pulse rounded-lg bg-gray-300" />
            </div>
          );
        })}
      </div>
    </>
  );
};
export default MessageSkeleton;
