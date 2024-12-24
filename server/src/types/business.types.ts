import { ObjectId, Document } from "mongoose";

export interface I_BusinessDocument extends Document {
  name: string;
  description: string;
  category: string;
  image: string;
  owner: ObjectId;
}
