import { I_BusinessDocument } from "../types/business.types";
import mongoose from "mongoose";

const businessSchema: mongoose.Schema<I_BusinessDocument> = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Business = mongoose.model<I_BusinessDocument>("Business", businessSchema);

export default Business;
