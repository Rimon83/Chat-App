import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      default: "",
    },
    imageUrl: {
      type: String,
      default: "",
    },
    videoUrl: {
      type: String,
      default: "",
    },
    seen: {
      type: Boolean,
      default: false,
    },
    msgByUserId: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);
const Message =
  mongoose.models.Message ||
  mongoose.model("Message", MessageSchema);

export default Message;
