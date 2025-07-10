import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatHeader from "~/components/ChatHeader";
import MessageInput from "~/components/MessageInput";
import MessageSkeleton from "~/components/skeletons/MessageSkeleton";
import { getSocket } from "~/lib/socket";
import { getMessages } from "~/store/slices/chatSlice";
import { formatMessageTime } from "~/utils/formatTime";

const ChatContainer = () => {
  const dispatch = useDispatch();
  const { messages, isMessageLoading, selectedUser } = useSelector(
    (state) => state.chat,
  );

  const { authUser } = useSelector((state) => state.auth);

  const messageEndRef = useRef(null);

  useEffect(() => {
    dispatch(getMessages(selectedUser._id));
  }, [selectedUser._id]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    if (!selectedUser?._id) return;

    dispatch(getMessages(selectedUser._id));

    const socket = getSocket();

    if (!socket) return;
  }, [selectedUser?._id]);

  if (isMessageLoading) {
    return (
      <div className="flex flex-1 flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-1 flex-col overflow-hidden bg-white">
        <ChatHeader />

        {/* Messages */}
        <div className="flex-1 space-y-6 overflow-y-auto p-4">
          {messages?.length > 0 &&
            messages?.map((message, index) => {
              const isSender = message.senderId === authUser?.data?.user?._id;
              return (
                <div
                  key={message._id}
                  ref={index === messages.length - 1 ? messageEndRef : null}
                  className={`flex items-end ${isSender ? "justify-end" : "justify-start"}`}
                >
                  {/* Avatar */}
                  <div
                    className={`h-10 w-10 shrink-0 overflow-hidden rounded-full border ${isSender ? "order-2 ml-3" : "order-1 mr-3"}`}
                  >
                    <img
                      src={
                        isSender
                          ? authUser?.data?.user?.avatar ||
                            "https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png"
                          : selectedUser?.avatar ||
                            "https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png"
                      }
                      alt="avatar"
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/* Bubble */}
                  <div
                    className={`max-w-xs rounded-xl px-4 py-2 text-sm sm:max-w-sm md:max-w-md ${isSender ? "order-1 bg-blue-400/20 text-black" : "order-2 bg-gray-200 text-black"}`}
                  >
                    {message.media && (
                      <>
                        {message.media.includes(".mp4") ||
                        message.media.includes(".webm") ||
                        message.media.includes(".mov") ? (
                          <video
                            src={message.media}
                            controls
                            className="mb-2 w-full rounded-md"
                          />
                        ) : (
                          <img
                            src={message.media}
                            alt="image"
                            className="mb-2 w-full rounded-md"
                          />
                        )}
                      </>
                    )}

                    {message.text && <p>{message.text}</p>}

                    <span className="mt-1 block text-right text-[10px] text-gray-400">
                      {formatMessageTime(message.createdAt)}
                    </span>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};
export default ChatContainer;
