import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authorizeAxiosInstance from "~/lib/axios";
import { connectSocket, disconnectSocket } from "~/lib/socket";

export const getUser = createAsyncThunk("auth/getUser", async () => {
  try {
    const response = await authorizeAxiosInstance.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/user/getUser`,
    );

    connectSocket(response.data);

    return response.data;
  } catch (error) {
    console.error(`Error fetching user: ${error}`);
  }
});

export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  try {
    await authorizeAxiosInstance.delete(
      `${import.meta.env.VITE_BACKEND_URL}/api/auth/logout`,
    );

    disconnectSocket();
    return null;
  } catch (error) {
    console.error(`Error logout user: ${error}`);
  }
});

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (formData) => {
    try {
      const response = await authorizeAxiosInstance.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
        formData,
      );

      connectSocket(response.data.data);
      return response.data;
    } catch (error) {
      console.error(`Error loginUser : ${error}`);
    }
  },
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (formData) => {
    try {
      const response = await authorizeAxiosInstance.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/register`,
        formData,
      );

      connectSocket(response.data.data);
      return response.data;
    } catch (error) {
      console.error(`Error registerUser user: ${error}`);
    }
  },
);

export const verifyAccount = createAsyncThunk(
  "auth/verifyAccount",
  async ({ email, token }) => {
    try {
      const response = await authorizeAxiosInstance.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/verify-account`,
        { email, token },
      );

      return response.data;
    } catch (error) {
      console.error(`Error verifyAccount user: ${error}`);
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    onlineUsers: [],
  },
  reducers: {
    setOnlineUsers(state, action) {
      state.onlineUsers = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.fulfilled, (state, action) => {
        state.isCheckingAuth = false;
        state.authUser = action.payload;
      })
      .addCase(getUser.rejected, (state) => {
        state.isCheckingAuth = false;
        state.authUser = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.authUser = null;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.authUser = state.auth;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoggingIn = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoggingIn = false;
        state.authUser = action.payload;
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoggingIn = false;
      })
      .addCase(registerUser.pending, (state) => {
        state.isSigningUp = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isSigningUp = false;
        state.authUser = action.payload;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isSigningUp = false;
      });
  },
});

export const { setOnlineUsers } = authSlice.actions;
export default authSlice.reducer;
