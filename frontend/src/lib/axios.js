import axios from "axios";
import { toast } from "react-toastify";

let authorizeAxiosInstance = axios.create();

authorizeAxiosInstance.defaults.timeout = 1000 * 60 * 10;

authorizeAxiosInstance.defaults.withCredentials = true;

// Interceptors request can thiệp vào giữa những cái request API
authorizeAxiosInstance.interceptors.request.use(
  (config) => {
    //

    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  },
);

// Interceptors response can thiệp vào giữa những cái response API nhận về
authorizeAxiosInstance.interceptors.response.use(
  (response) => {
    //

    return response;
  },
  (error) => {
    // Xử lý lỗi (nếu có)
    let errorMessage = error?.message;
    if (error.response?.data?.message) {
      errorMessage = error.response?.data?.message;
    }

    toast.error(errorMessage);

    return Promise.reject(error);
  },
);

export default authorizeAxiosInstance;
