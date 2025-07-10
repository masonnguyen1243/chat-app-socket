import { Users } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SidebarSkeleton from "~/components/skeletons/SidebarSkeleton";
import { getUsers, setSelectedUser } from "~/store/slices/chatSlice";

const Sidebar = () => {
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const { users, selectedUser, isUsersLoading } = useSelector(
    (state) => state.chat,
  );

  const { onlineUsers } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const filteredUsers = showOnlineOnly
    ? users?.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <>
      <aside className="flex h-full w-20 flex-col border-r border-gray-200 bg-white transition-all duration-200 lg:w-72">
        {/* Header */}
        <div className="w-full border-b border-gray-200 p-5">
          <div className="flex items-center gap-2">
            <Users className="h-6 w-6 text-gray-700" />
            <span className="hidden font-medium text-gray-800 lg:block">
              Contacts
            </span>
          </div>

          {/* Online only filter */}
          <div className="mt-3 hidden items-center gap-2 lg:flex">
            <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={showOnlineOnly}
                onChange={(e) => setShowOnlineOnly(e.target.checked)}
                className="h-4 cursor-pointer border-gray-700 p-4 text-blue-600 focus:ring-blue-500"
              />
              <span className="select-none"> Show Online Only</span>
            </label>
            <span className="text-xs text-gray-500 select-none">
              ({onlineUsers.length - 1} online)
            </span>
          </div>
        </div>

        {/* Users list */}
        <div className="w-full overflow-y-auto py-3">
          {filteredUsers?.length > 0 &&
            filteredUsers.map((user) => {
              return (
                <button
                  key={user?._id}
                  onClick={() => dispatch(setSelectedUser(user))}
                  className={`flex w-full cursor-pointer items-center gap-3 rounded-md p-3 transition-colors ${selectedUser?._id === user?._id ? "bg-gray-200 ring-gray-200" : "hover:bg-gray-200"}`}
                >
                  {/* Avatar */}
                  <div className="relative mx-auto lg:mx-0">
                    <img
                      src={
                        user?.avatar ||
                        "https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png"
                      }
                      alt="avatar"
                      className="h-12 w-12 rounded-full object-cover"
                    />
                    {onlineUsers?.includes(user?._id) && (
                      <span className="absolute right-0 bottom-0 h-3 w-3 rounded-full bg-green-500 ring-2 ring-white" />
                    )}
                  </div>
                  {/* User info */}
                  <div className="hidden min-w-0 text-left lg:block">
                    <div className="truncate font-medium text-gray-800">
                      {user?.username}
                    </div>
                    <div className="text-sm text-gray-500">
                      {onlineUsers?.includes(user?._id) ? "Online" : "Offline"}
                    </div>
                  </div>
                </button>
              );
            })}

          {filteredUsers?.length === 0 && (
            <div className="p-4 text-center text-gray-500">No Online Users</div>
          )}
        </div>
      </aside>
    </>
  );
};
export default Sidebar;
