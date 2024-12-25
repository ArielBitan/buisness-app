export type Plan = "Default" | "Standard" | "Gold" | "Platinum";

export interface IUser {
  _id: string;
  name: string;
  profilePic?: string;
  plan: Plan;
  savedBusinesses: string[];
  createdAt: string;
  businessCount: number;
  email: string;
}
