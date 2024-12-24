import { ObjectId, Document } from "mongoose";

export interface I_Subscription extends Document {
  user: ObjectId;
  business: ObjectId;
}
