import { I_Subscription } from "../types/subscription.types";
import mongoose from "mongoose";

const subscriberSchema: mongoose.Schema<I_Subscription> = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    business: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
      required: true,
    },
  },
  {
    timestamps: { createdAt: "subscribedAt", updatedAt: false },
    versionKey: false,
  }
);

const Subscriber = mongoose.model<I_Subscription>(
  "Subscriber",
  subscriberSchema
);

export default Subscriber;
