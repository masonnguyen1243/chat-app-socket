import { useEffect } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { verifyAccount } from "~/store/slices/authSlice";

const VerifyAccount = () => {
  const dipatch = useDispatch();
  //Lấy giá trị email và token từ URL
  let [searchParams] = useSearchParams();

  const { email, token } = Object.fromEntries([...searchParams]);

  //Gọi API để verify tài khoản
  useEffect(() => {
    if (email && token) {
      toast
        .promise(dipatch(verifyAccount({ email, token })), {
          pending: "Loading...",
        })
        .then((res) => {
          if (!res.error) {
            toast.success(
              "Verification successfully! Please login to enjoy our service!",
            );
          }
        });
    }
  }, [email, token]);

  //Nếu URL có vấn đề, không tồn tài 1 trong 2 giá trị email hoặc token thì đá ra trang 404
  if (!email || !token) {
    return <Navigate to={"/"} />;
  }

  //Cuối cùng nếu k gặp vấn đề gì + Verify thành công thì điều hướng về trang Login cùng giá trị verifiedEmail

  return <Navigate to={`/login`} />;
};
export default VerifyAccount;
