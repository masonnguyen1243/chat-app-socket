import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "~/components/Navbar";

const PrivateRoutes = () => {
  const { authUser } = useSelector((state) => state.auth);

  return authUser ? (
    <div>
      <Navbar />
      <Outlet />
    </div>
  ) : (
    <Navigate to={"/login"} />
  );
};
export default PrivateRoutes;
