import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ToastContainer } from "react-toastify";

//Setup redux
import { Provider } from "react-redux";
import store from "~/store/store";

//Setup redux persits
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
const persistor = persistStore(store);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <ToastContainer position="bottom-right" />
      <App />
    </PersistGate>
  </Provider>,
);
