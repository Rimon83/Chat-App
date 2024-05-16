import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "provide name"],
    },
    email: {
      type: String,
      required: [true, "provide email"],
    },
    password: {
      type: String,
      required: [true, "provide password"],
    },
    profile_pic:{
     type: String,
     default: ''
    }
  },
  { timestamps: true }
);
const User =
  mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
