import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoutes from "~/components/layout/PrivateRoutes";
import Home from "~/pages/Home";
import Register from "~/pages/Register";
import Login from "~/pages/Login";
import Profile from "~/pages/Profile";
import VerifyAccount from "~/pages/VerifyAccount";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Private routes */}
        <Route path="/" element={<PrivateRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        {/* Others */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/account/verification" element={<VerifyAccount />} />
      </Routes>
    </Router>
  );
};
export default App;
