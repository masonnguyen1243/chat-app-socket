import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";

//Config redux-persist
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

//Config persist
const rootPersistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["auth"],
};

const reducers = combineReducers({
  auth: authReducer,
});

// Thực hiện persist Reducer
const persistedReducers = persistReducer(rootPersistConfig, reducers);

const store = configureStore({
  reducer: persistedReducers,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
