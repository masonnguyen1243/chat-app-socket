import { Loader } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connectSocket, disconnectSocket } from "~/lib/socket";
import { getUser, setOnlineUsers } from "~/store/slices/authSlice";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Navbar from "~/components/Navbar";
import Home from "~/pages/Home";
import Register from "~/pages/Register";
import Login from "~/pages/Login";
import Profile from "~/pages/Profile";

const App = () => {
  const dispatch = useDispatch();
  const { authUser, isCheckingAuth } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getUser());
  }, [getUser]);

  useEffect(() => {
    if (authUser) {
      const socket = connectSocket(authUser.data._id);

      socket.on("getOnlineUsers", (users) => {
        dispatch(setOnlineUsers(users));
      });

      return () => disconnectSocket();
    }

    if (isCheckingAuth && !authUser) {
      return (
        <div className="flex h-screen items-center justify-center">
          <Loader className="size-10 animate-spin" />
        </div>
      );
    }
  }, [authUser]);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={authUser ? <Home /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/register"
          element={!authUser ? <Register /> : <Navigate to={"/"} />}
        />
        <Route
          path="/login"
          element={!authUser ? <Login /> : <Navigate to={"/"} />}
        />
        <Route
          path="/profile"
          element={authUser ? <Profile /> : <Navigate to={"/login"} />}
        />
      </Routes>
    </Router>
  );
};
export default App;
