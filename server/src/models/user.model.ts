import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { I_UserDocument } from "../types/user.types";

const userSchema: mongoose.Schema<I_UserDocument> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
      unique: false,
      default: "Anonymous",
    },
    password: {
      type: String,
      required: true,
      unique: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    profilePic: {
      type: String,
      required: false,
    },
    plan: {
      type: String,
      enum: ["Normal", "Standard", "Gold", "Platinum"],
      default: "Normal",
    },
    savedBusinesses: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Business" },
    ],
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
    versionKey: false,
  }
);

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    try {
      const saltRounds = process.env.salt_rounds
        ? parseInt(process.env.salt_rounds)
        : 10;
      user.password = await bcrypt.hash(user.password, saltRounds);
    } catch (error) {
      next(error);
    }
  }
  next();
});

const User = mongoose.model<I_UserDocument>("User", userSchema);

export default User;
