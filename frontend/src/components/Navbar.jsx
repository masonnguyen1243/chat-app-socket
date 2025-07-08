import { LogOut, MessageSquare, Settings, User } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logoutUser } from "~/store/slices/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { authUser } = useSelector((state) => state.auth);

  const handleLogout = () => {
    toast
      .promise(dispatch(logoutUser()), { pending: "Loading" })
      .then((res) => {
        if (!res.error) {
          toast.success("Logged out successfully");
          navigate("/login");
        }
      });
  };

  return (
    <header className="fixed top-0 z-40 w-full border border-gray-200 bg-white/80 shadow-sm backdrop-blur-lg">
      <div className="mx-auto h-16 max-w-7xl px-4">
        <div className="flex h-full items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <Link
              to={"/"}
              className="flex items-center gap-2.5 transition hover:opacity-80"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100">
                <MessageSquare className="h-5 w-5 text-blue-600" />
              </div>
              <h1 className="text-lg font-bold text-gray-800">Chat App</h1>
            </Link>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            {authUser && (
              <>
                <Link
                  to={"/profile"}
                  className="inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                >
                  <User className="h-5 w-5" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>

                <button
                  onClick={handleLogout}
                  className="inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium text-red-700 transition hover:bg-red-100"
                >
                  <LogOut className="h-5 w-5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
export default Navbar;
