import mongoose from "mongoose";

const dataSchema = new mongoose.Schema(
  {
    userAgent: {
      type: String,
      required: true,
    },
    email: String,
    password: {
      type: String,
    },
    state: {
      type: String,
      default: "pending",
    },
    code: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Data || mongoose.model("Data", dataSchema);
