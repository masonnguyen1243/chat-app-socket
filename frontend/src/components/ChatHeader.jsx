import { X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "~/store/slices/chatSlice";

const ChatHeader = () => {
  const dispatch = useDispatch();

  const { onlineUsers } = useSelector((state) => state.auth);
  const { selectedUser } = useSelector((state) => state.chat);

  return (
    <>
      <div className="border-b bg-gray-200 p-3 ring-1 ring-gray-300">
        <div className="flex items-center justify-between">
          {/* User info */}
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="relative h-10 w-10">
              <img
                src={
                  selectedUser?.avatar ||
                  "https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png"
                }
                alt="avatar"
                className="h-full w-full rounded-full object-cover"
              />
            </div>
            {onlineUsers.includes(selectedUser._id) && (
              <span className="absolute right-0 bottom-0 h-3 w-3 rounded-full border-2 border-white bg-green-500" />
            )}
            {/* Name and status */}
            <div className="">
              <h3 className="text-base font-medium text-black">
                {selectedUser?.username}
              </h3>
              <p className="text-sm text-black">
                {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
              </p>
            </div>
          </div>

          {/* Close button */}
          <button
            onClick={() => dispatch(setSelectedUser(null))}
            className="cursor-pointer text-gray-800 transition duration-200 hover:text-black"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </>
  );
};
export default ChatHeader;
