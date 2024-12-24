import { Document, ObjectId } from "mongoose";

export interface I_NotificationDocument extends Document {
  user: ObjectId;
  business: ObjectId;
  message: string;
  read: boolean;
}
