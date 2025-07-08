import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  MessageSquare,
  User,
} from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthImagePattern from "~/components/AuthImagePattern";
import { registerUser } from "~/store/slices/authSlice";
import { useForm } from "react-hook-form";
import {
  EMAIL_RULE,
  EMAIL_RULE_MESSAGE,
  FIELD_REQUIRED_MESSAGE,
  PASSWORD_RULE,
  PASSWORD_RULE_MESSAGE,
} from "~/utils/validators";
import FieldErrorAlert from "~/components/form/FieldErrorAlert";

const Register = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isSigningUp } = useSelector((state) => state.auth);

  const handleRegister = (data) => {
    const { username, email, password } = data;

    toast
      .promise(dispatch(registerUser({ username, email, password })), {
        pending: "Loading",
      })
      .then((res) => {
        if (!res.payload.data.success) {
          toast.success("Registration successfully");
          reset();
          navigate("/login");
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
              <h1 className="mt-4 text-2xl font-bold">Create account</h1>
              <p className="mt-2 text-sm text-gray-500">
                Get started with your free account
              </p>
            </div>

            {/* Register form */}
            <form onSubmit={handleSubmit(handleRegister)} className="space-y-6">
              {/* Username */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Username
                </label>
                <div className="relative">
                  <span className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400">
                    <User className="h-5 w-5" />
                  </span>
                  <input
                    type="text"
                    placeholder="Enter your username"
                    {...register("username", {
                      required: FIELD_REQUIRED_MESSAGE,
                    })}
                    className="w-full rounded-md border border-gray-300 py-2 pr-3 pl-10 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <FieldErrorAlert errors={errors} fieldName={"username"} />
              </div>
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
                    {...register("email", {
                      required: FIELD_REQUIRED_MESSAGE,
                      pattern: {
                        value: EMAIL_RULE,
                        message: EMAIL_RULE_MESSAGE,
                      },
                    })}
                    className="w-full rounded-md border border-gray-300 py-2 pr-3 pl-10 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <FieldErrorAlert errors={errors} fieldName={"email"} />
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
                    {...register("password", {
                      required: FIELD_REQUIRED_MESSAGE,
                      pattern: {
                        value: PASSWORD_RULE,
                        message: PASSWORD_RULE_MESSAGE,
                      },
                    })}
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
                <FieldErrorAlert errors={errors} fieldName={"password"} />
              </div>

              <button
                type="submit"
                disabled={isSigningUp}
                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-blue-600 py-2 font-medium text-white transition duration-200 hover:bg-blue-700"
              >
                {isSigningUp ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" /> Loading...
                  </>
                ) : (
                  "Register"
                )}
              </button>
            </form>
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                Already have an account?{" "}
                <Link to={"/login"} className="text-blue-600 hover:underline">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Right side */}
        <AuthImagePattern
          title={"Join our community!"}
          subtitle={
            "Connect with friends and family, share your thought and stay in touch with your loved ones"
          }
        />
      </div>
    </>
  );
};
export default Register;
