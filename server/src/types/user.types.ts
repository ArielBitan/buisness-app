import mongoose, { Document } from "mongoose";

export type Plan = "Default" | "Standard" | "Gold" | "Platinum";

export interface I_UserDocument extends Document {
  _id: mongoose.Types.ObjectId;
  email: string;
  name: string;
  password: string;
  profilePic: string;
  plan: Plan;
}

export type I_UserWithoutPassword = Omit<I_UserDocument, "password">;

export const PLAN_LIMITS = {
  Default: 0,
  Standard: 5,
  Gold: 10,
  Platinum: 20,
};
