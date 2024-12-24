import { I_ReviewSchema } from "../types/review.types";
import mongoose from "mongoose";

const reviewSchema: mongoose.Schema<I_ReviewSchema> = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    business: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Review = mongoose.model<I_ReviewSchema>("Review", reviewSchema);

export default Review;
