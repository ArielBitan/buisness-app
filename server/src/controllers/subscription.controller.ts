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

// Subscribe to a business
export const subscribe = async (req: Request, res: Response) => {
  const _id = req.user?.userId.toString();
  const { id } = req.params;

  try {
    const subscription = await subscriptionService.subscribeToBusiness(_id, id);
    res.status(201).json(subscription);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Unsubscribe from a business
export const unsubscribe = async (req: Request, res: Response) => {
  const _id = req.user?.userId.toString();
  const { id } = req.params;

  try {
    const subscription = await subscriptionService.unsubscribeFromBusiness(
      _id,
      id
    );
    res
      .status(200)
      .json({ message: "Unsubscribed successfully", subscription });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
