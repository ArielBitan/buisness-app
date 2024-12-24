import mongoose, { Schema } from "mongoose";
import { I_NotificationDocument } from "../types/notification.types";

const notificationSchema: Schema<I_NotificationDocument> = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    business: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
    versionKey: false,
  }
);

const Notification = mongoose.model<I_NotificationDocument>(
  "Notification",
  notificationSchema
);

export default Notification;
