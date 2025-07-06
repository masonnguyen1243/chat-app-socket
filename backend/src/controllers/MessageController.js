import { StatusCodes } from "http-status-codes";
import Message from "../models/MessageModel.js";
import User from "../models/UserModel.js";
import { CloudinaryMediaProvider } from "../utils/CloudinaryVideoUpload.js";
import { getReceiverSocketId, io } from "../utils/Socket.js";

export const getMessages = async (req, res) => {
  try {
    const receiverId = req.params.id;
    const myId = req.user.userId;

    const receiver = await User.findById(receiverId);
    if (!receiver) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ success: false, message: "Receiver ID Invalid" });
    }

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: receiverId },
        { senderId: receiverId, receiverId: myId },
      ],
    }).sort({ createdAt: 1 });

    return res.status(StatusCodes.OK).json({ success: true, data: messages });
  } catch (error) {
    console.error(`Error in getMessages controller`);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: error.message });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text } = req.body;
    const media = req?.file;
    const receiverId = req.params.id;
    const senderId = req.user.userId;

    const receiver = await User.findById(receiverId);
    if (!receiver) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ success: false, message: "Receiver ID Invalid" });
    }

    const santizedText = text?.trim() || "";
    if (!santizedText && !media) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ success: false, message: "Cannot send empty message" });
    }

    let mediaUrl = "";
    if (media) {
      try {
        const uploadResponse = await CloudinaryMediaProvider.streamUpload(
          media?.buffer,
          "CHAT_APP_SOCKET_MEDIA",
          media?.mimetype?.startsWith("video/") ? "video" : "auto"
        );

        mediaUrl = uploadResponse?.secure_url;
      } catch (error) {
        console.error(error);
      }
    }

    const newMessage = await Message.create({
      senderId,
      receiverId,
      text: santizedText,
      media: mediaUrl,
    });

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    return res.status(StatusCodes.OK).json({ success: true, data: newMessage });
  } catch (error) {
    console.error(`Error in sendMessage controller`);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: error.message });
  }
};
