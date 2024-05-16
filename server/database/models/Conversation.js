import mongoose from "mongoose";

const ConversationSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: "User",
    },
    receiver: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: "User",
    },
    messages: [
      {
      type: mongoose.Schema.ObjectId,
      ref: "Message",
    }],
  },
  { timestamps: true }
);
const Conversation = mongoose.models.Conversation || mongoose.model("Conversation", ConversationSchema);

export default Conversation;
