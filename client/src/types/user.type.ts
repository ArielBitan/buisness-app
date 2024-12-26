import { IBusiness } from "./business.type";

export type Plan = "Default" | "Standard" | "Gold" | "Platinum";

export interface IUser {
  _id: string;
  name: string;
  profilePic?: string;
  plan: Plan;
  createdAt: string;
  businessCount: number;
  email: string;
}

export interface IUserProfile {
  user: {
    name: string;
    profilePic: string;
    email: string;
  };
  savedBusinesses: IBusiness[];
  userBusinesses: IBusiness[];
}
