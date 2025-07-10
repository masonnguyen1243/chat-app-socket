import { Users } from "lucide-react";

const SidebarSkeleton = () => {
  const skeletonContacts = Array(8).fill(null);

  return (
    <>
      <aside className="flex h-full w-20 flex-col border-r border-gray-200 transition-all duration-200 lg:w-72">
        {/* Header */}
        <div className="w-full border-b border-gray-200 p-5">
          <div className="flex items-center gap-2">
            <Users className="h-6 w-6 text-gray-700" />
            <span className="hidden font-medium text-gray-800 lg:block">
              Contacts
            </span>
          </div>
        </div>

        {/* Skeleton contacts */}
        <div className="w-full overflow-y-auto p-3">
          {skeletonContacts.map((_, index) => {
            return (
              <div
                key={index}
                className="flex w-full animate-pulse items-center gap-3 p-3"
              >
                {/* Avatar skeleton */}
                <div className="relative mx-auto lg:mx-0">
                  <div className="h-12 w-12 rounded-full bg-gray-300" />
                </div>

                {/* Text skeleton for large screens only */}
                <div className="hidden flex-1 flex-col gap-2 lg:flex">
                  <div className="h-4 w-32 rounded bg-gray-300" />
                  <div className="h-4 w-32 rounded bg-gray-300" />
                  <div className="h-4 w-32 rounded bg-gray-300" />
                </div>
              </div>
            );
          })}
        </div>
      </aside>
    </>
  );
};
export default SidebarSkeleton;
