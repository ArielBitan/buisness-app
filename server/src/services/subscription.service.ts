import User from "../models/user.model";
import Subscriber from "../models/subscriber.model";
import { Schema } from "mongoose";

//  get all subscribers of a specific business
export const getSubscribersByBusinessId = async (businessId: string) => {
  try {
    const subscribers = await Subscriber.find({ business: businessId });

    const users = await Promise.all(
      subscribers.map(
        async (subscriber) => await User.findById(subscriber.user)
      )
    );

    return users;
  } catch (error) {
    throw new Error("Error fetching subscribers: " + error.message);
  }
};

// Subscribe a user to a business
export const subscribeToBusiness = async (
  userId: string,
  businessId: string
) => {
  try {
    const existingSubscription = await Subscriber.findOne({
      user: userId,
      business: businessId,
    });
    const user = await User.findById(userId);
    if (existingSubscription) {
      throw new Error("User is already subscribed to this business.");
    }

    const newSubscription = new Subscriber({
      user: userId,
      business: businessId,
    });
    await newSubscription.save();
    return newSubscription;
  } catch (err) {
    throw new Error(err.message || "Failed to subscribe to business");
  }
};

// Unsubscribe a user from a business
export const unsubscribeFromBusiness = async (
  userId: string,
  businessId: string
) => {
  try {
    const subscription = await Subscriber.findOneAndDelete({
      user: userId,
      business: businessId,
    });
    if (!subscription) {
      throw new Error("User is not subscribed to this business.");
    }

    return subscription;
  } catch (err) {
    throw new Error(err.message || "Failed to unsubscribe from business");
  }
};

export const isSubscribed = async (
  userId: string,
  businessId: string
): Promise<boolean> => {
  const subscription = await Subscriber.findOne({
    user: userId,
    business: businessId,
  });
  return !!subscription;
};
