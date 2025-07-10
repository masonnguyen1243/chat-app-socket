import { Image, Send, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getSocket } from "~/lib/socket";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [mediaPreview, setMediaPreview] = useState(null);
  const [media, setMedia] = useState(null);
  const [mediaType, setMediaType] = useState("");
  const fileInputRef = useRef();
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((state) => state.chat);

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setMedia(file);
    const type = file.type;

    if (type.startWith("image/")) {
      setMediaType("image");
      const reader = new FileReader(
        (reader.onload = () => {
          setMediaPreview(reader.result);
        }),
        reader.readAsDataURL(file),
      );
    } else if (type.startWith("video/")) {
      setMediaType("video");
      const videoUrl = URL.createObjectURL(file);
      setMediaPreview(videoUrl);
    } else {
      toast.error("Please select an image or video file.");
      setMedia(null);
      setMediaPreview(null);
      setMediaType("");
      return;
    }
  };

  const removeMedia = () => {
    setMedia(null);
    setMediaPreview(null);
    setMediaType("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!text.trim() && !media) return;

    const data = new FormData();
    data.append("text", text.trim());
    data.append("media", media);

    // dispatch(sendMessage(data));

    // reset all
    setText("");
    setMedia(null);
    setMediaPreview(null);
    setMediaType("");

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    const handleNewMessage = (newMessage) => {
      if (
        newMessage.senderId === selectedUser._id ||
        newMessage.receiverId === selectedUser._id
      ) {
        dispatch({ type: "chat/pushNewMessage", payload: newMessage });
      }
    };

    socket.on("newMessage", handleNewMessage);

    return () => socket.off("newMessage", handleNewMessage);
  }, [selectedUser._id]);

  return (
    <>
      <div className="w-full p-4">
        {mediaPreview && (
          <div className="mb-3 flex items-center gap-2">
            <div className="relative">
              {mediaType === "image" ? (
                <img
                  src={mediaPreview}
                  alt="mediaPreview"
                  className="h-20 w-20 border border-gray-700 object-cover"
                />
              ) : (
                <video
                  src={mediaPreview}
                  controls
                  className="h-20 w-32 rounded-lg border border-gray-700 object-cover"
                />
              )}

              <button
                onClick={removeMedia}
                type="button"
                className="absolute -top-2 right-2 flex h-5 w-5 items-center justify-center rounded-full bg-zinc-800 text-white hover:bg-black"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          </div>
        )}

        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
          <div className="flex flex-1 gap-2">
            <input
              type="text"
              placeholder="Type a message..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none sm:text-base"
            />

            <input
              type="file"
              accept="image/*, video/*"
              ref={fileInputRef}
              className="hidden"
              onChange={handleChange}
            />

            <button
              type="button"
              onClick={() => fileInputRef.current.click()}
              className={`hidden h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-gray-300 transition hover:border-gray-100 sm:flex ${mediaPreview ? "text-emerald-500" : "text-gray-400"}`}
            >
              <Image size={20} />
            </button>
          </div>

          <button
            type="submit"
            disabled={!text.trim() && !media}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-blue-600 text-white transition hover:bg-blue-700 disabled:opacity-50"
          >
            <Send size={22} />
          </button>
        </form>
      </div>
    </>
  );
};
export default MessageInput;
