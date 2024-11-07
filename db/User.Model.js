import mongoose from "mongoose";
const User = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    admin: {
      type: Boolean,
      default: false,
    },
    uniqueId: {
      type: Number,
      required: true,
      unique: true,
    },
    data: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Data",
      },
    ],
  },
  {
    timestamps: true,
  }
);
export default mongoose.models.User || mongoose.model("User", User);
