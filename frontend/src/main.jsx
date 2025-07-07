import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ToastContainer } from "react-toastify";

//Setup redux
import { Provider } from "react-redux";
import store from "~/store/store";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ToastContainer position="bottom-right" />
    <App />
  </Provider>,
);
