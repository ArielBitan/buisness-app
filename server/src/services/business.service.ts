import Subscriber from "../models/subscriber.model";
import Business from "../models/business.model";
import Notification from "../models/notification.model";
import { I_BusinessDocument } from "../types/business.types";
import { io } from "../index";

// Get businesses with optional filters
export const getBusinesses = async (
  filter: Record<string, any>,
  limit: number
) => {
  try {
    const businesses = await Business.find(filter).limit(limit).exec();

    return businesses;
  } catch (err) {
    throw new Error("Failed to get businesses");
  }
};

export const checkBusinessOwnerService = async (
  businessId: string,
  userId: string
) => {
  try {
    const business = await Business.findById(businessId);

    if (!business) {
      throw new Error("Business not found");
    }
    return business.owner.toString() === userId;
  } catch (err) {
    throw new Error("Error checking business ownership");
  }
};

// Create a new business
export const createBusiness = async (
  name: string,
  description: string,
  category: string,
  image: string,
  owner: string
) => {
  try {
    const newBusiness = await Business.create({
      name,
      description,
      category,
      image,
      owner,
    });
    return newBusiness;
  } catch (err) {
    throw new Error("Failed to create business");
  }
};

export const updateBusiness = async (
  id: string,
  updatedData: Partial<I_BusinessDocument>
) => {
  try {
    const subscribedUsers = await Subscriber.find({ business: id });
    const notifications = await Promise.all(
      subscribedUsers.map(
        async (subscription) =>
          await Notification.create({
            user: subscription.user,
            business: id,
            message: `${id} Updated!`,
          })
      )
    );

    const updatedBusiness = await Business.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    if (!updatedBusiness) {
      throw new Error("Business not found");
    }

    // Notify all users subscribed to the business
    io.to(id).emit("businessUpdated", {
      businessId: id,
      message: `The business has been updated.`,
    });

    return updatedBusiness;
  } catch (err) {
    throw new Error("Failed to update business");
  }
};

// Delete business by ID
export const deleteBusiness = async (id: string) => {
  try {
    // Delete the business
    const deletedBusiness = await Business.findByIdAndDelete(id);

    if (!deletedBusiness) {
      throw new Error("Business not found");
    }

    // Delete all subscriptions to the business
    const deletedSubscriptions = await Subscriber.deleteMany({ business: id });

    // Emit the deletion event to all subscribers (rooms)
    io.to(id).emit("businessDeleted", {
      businessId: id,
      message: `The business has been deleted.`,
    });

    return deletedBusiness;
  } catch (err) {
    throw new Error("Failed to delete business");
  }
};
