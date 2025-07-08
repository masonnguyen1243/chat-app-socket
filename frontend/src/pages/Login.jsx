import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import AuthImagePattern from "~/components/AuthImagePattern";
import { loginUser } from "~/store/slices/authSlice";
import { toast } from "react-toastify";

const Login = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggingIn } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();

    toast
      .promise(dispatch(loginUser(formData)), {
        pending: "Loading",
      })
      .then((res) => {
        if (!res.error) {
          toast.success("Logged in successfully");
          setFormData({
            email: "",
            password: "",
          });
          navigate("/");
        }
      });
  };
  return (
    <>
      <div className="grid min-h-screen grid-cols-1 bg-white lg:grid-cols-2">
        {/* Left side */}
        <div className="flex flex-col items-center justify-center px-6 py-12">
          <div className="w-full max-w-md">
            {/* Logo */}
            <div className="mb-10 flex flex-col items-center text-center">
              <div className="rounded-lg bg-blue-100 p-3">
                <MessageSquare className="h-6 w-6 text-blue-600" />
              </div>
              <h1 className="mt-4 text-2xl font-bold">Welcome back</h1>
              <p className="mt-2 text-sm text-gray-500">
                Sign in to your account
              </p>
            </div>

            {/* Login form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Email
                </label>
                <div className="relative">
                  <span className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400">
                    <Mail className="h-5 w-5" />
                  </span>
                  <input
                    type="email"
                    placeholder="example@gmail.com"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full rounded-md border border-gray-300 py-2 pr-3 pl-10 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>
              {/* Password */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <span className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400">
                    <Lock className="h-5 w-5" />
                  </span>
                  <input
                    type={isShowPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    required
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className="w-full rounded-md border border-gray-300 py-2 pr-3 pl-10 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setIsShowPassword(!isShowPassword)}
                    className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-gray-400"
                  >
                    {isShowPassword ? (
                      <Eye className="h-5 w-5" />
                    ) : (
                      <EyeOff className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoggingIn}
                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-blue-600 py-2 font-medium text-white transition duration-200 hover:bg-blue-700"
              >
                {isLoggingIn ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" /> Loading...
                  </>
                ) : (
                  "Login"
                )}
              </button>
            </form>
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                Don't have an account?{" "}
                <Link
                  to={"/register"}
                  className="text-blue-600 hover:underline"
                >
                  Create account
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Right side */}
        <AuthImagePattern
          title={"Welcome back!"}
          subtitle={
            "Sign in to continue your conversation and catch up with your messages."
          }
        />
      </div>
    </>
  );
};
export default Login;
