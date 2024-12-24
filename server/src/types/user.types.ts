import { ObjectId } from "mongoose";
import mongoose, { Document } from "mongoose";

export type Plan = "Normal" | "Standard" | "Gold" | "Platinum";

export interface I_UserDocument extends Document {
  _id: mongoose.Types.ObjectId;
  email: string;
  name: string;
  password: string;
  profilePic: string;
  plan: Plan;
  savedBusinesses: ObjectId[];
}

export type I_UserWithoutPassword = Omit<I_UserDocument, "password">;
