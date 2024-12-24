import { ObjectId, Document } from "mongoose";
export interface I_ReviewSchema extends Document {
  user: ObjectId;
  business: ObjectId;
  content: string;
}
