import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authorizeAxiosInstance from "~/lib/axios";

export const getUsers = createAsyncThunk("chat/getUsers", async () => {
  try {
    const response = await authorizeAxiosInstance.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/user/getUsers`,
    );

    return response.data.data;
  } catch (error) {
    console.error(error);
  }
});

export const getMessages = createAsyncThunk(
  "chat/getMessages",
  async (userId) => {
    try {
      const response = await authorizeAxiosInstance.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/message/getMessages/${userId}`,
      );

      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
);

export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  async (messageData, thunkAPI) => {
    try {
      const { chat } = thunkAPI.getState();
      const response = await authorizeAxiosInstance.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/message/send/${chat.selectedUser._id}`,
        messageData,
      );

      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
);

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessageLoading: false,
  },
  reducers: {
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    pushNewMessage: (state, action) => {
      state.messages.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.isUsersLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isUsersLoading = false;
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state) => {
        state.isUsersLoading = false;
      })
      .addCase(getMessages.pending, (state) => {
        state.isMessageLoading = true;
      })
      .addCase(getMessages.fulfilled, (state, action) => {
        state.isMessageLoading = false;
        state.messages = action.payload.data;
      })
      .addCase(getMessages.rejected, (state) => {
        state.isMessageLoading = false;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.messages.push(action.payload.data);
      });
  },
});

export const { setSelectedUser, pushNewMessage } = chatSlice.actions;
export default chatSlice.reducer;
