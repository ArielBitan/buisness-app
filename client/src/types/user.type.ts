export type Plan = "Normal" | "Standard" | "Gold" | "Platinum";

export interface IUser {
  _id: string;
  name: string;
  profilePic?: string;
  plan: Plan;
  savedBusinesses: string[];
  createdAt: string;
}
