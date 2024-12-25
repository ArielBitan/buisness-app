import { Request, Response } from "express";
import * as subscriptionService from "../services/subscription.service";

// get all subscribers of a business
export const getSubscribers = async (req: Request, res: Response) => {
  try {
    const businessId = req.params.id;
    const subscribers = await subscriptionService.getSubscribersByBusinessId(
      businessId
    );

    if (subscribers.length === 0) {
      res
        .status(404)
        .json({ message: "No subscribers found for this business." });
      return;
    }

    res.status(200).json(subscribers);
    return;
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while fetching subscribers.",
      error: error.message,
    });
    return;
  }
};

export const checkSubscription = async (req: Request, res: Response) => {
  const _id = req.user?.userId.toString();
  const { id } = req.params;
  const isSubscribed = await subscriptionService.isSubscribed(_id, id);
  res.status(200).json(isSubscribed);
};

export const toggleSubscription = async (req: Request, res: Response) => {
  const _id = req.user?.userId.toString();
  const { id } = req.params;

  try {
    // Check if the user is already subscribed
    const isSubscribed = await subscriptionService.isSubscribed(_id, id);

    let subscription;
    let message;

    if (isSubscribed) {
      // Unsubscribe if already subscribed
      subscription = await subscriptionService.unsubscribeFromBusiness(_id, id);
      message = "Unsubscribed successfully";
    } else {
      // Subscribe if not subscribed
      subscription = await subscriptionService.subscribeToBusiness(_id, id);
      message = "Subscribed successfully";
    }

    res.status(200).json({ message, subscription });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
