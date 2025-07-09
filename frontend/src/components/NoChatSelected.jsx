import { MessageSquare } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="flex w-full flex-1 flex-col items-center justify-center bg-white/50 p-16">
      <div className="max-w-md space-y-6 text-center">
        {/* Icon display */}
        <div className="mb-4 flex justify-center gap-4">
          <div className="relative">
            <div className="flex h-16 w-16 animate-bounce items-center justify-center rounded-2xl bg-blue-100">
              <MessageSquare className="h-8 w-8 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Welcome text */}
        <h2 className="text-2xl font-bold text-gray-800">
          Welcome to Chat App
        </h2>
        <p className="text-gray-500">
          Select a conversation from the sidebar to start chatting
        </p>
      </div>
    </div>
  );
};
export default NoChatSelected;
