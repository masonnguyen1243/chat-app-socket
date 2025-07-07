import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authorizeAxiosInstance from "~/lib/axios";
import { connectSocket } from "~/lib/socket";

export const getUser = createAsyncThunk("auth/getUser", async () => {
  try {
    const response = await authorizeAxiosInstance.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/user/getUser`,
    );
    connectSocket(response.data.data._id);

    return response.data;
  } catch (error) {
    console.error(`Error fetching user: ${error}`);
  }
});

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
      });
  },
});

export const { setOnlineUsers } = authSlice.actions;
export default authSlice.reducer;
