import { useSelector } from "react-redux";
import ChatContainer from "~/components/ChatContainer";
import NoChatSelected from "~/components/NoChatSelected";
import Sidebar from "~/components/Sidebar";

const Home = () => {
  const { selectedUser } = useSelector((state) => state.chat);

  return (
    <>
      <div className="min-h-screen bg-gray-100">
        <div className="flex items-center justify-center px-4 pt-20">
          <div className="h-[calc(100vh-8rem)] w-full max-w-6xl rounded-lg bg-white shadow-md">
            <div className="flex h-full overflow-hidden rounded-lg">
              <Sidebar />
              {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
