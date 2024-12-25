export interface IBusiness {
  _id: string;
  name: string;
  description: string;
  category: string;
  image: string;
  owner: string;
  createdAt: string;
  updatedAt: string;
}

export interface ISubscription {
  _id: string;
  userId: string;
  businessId: string;
  subscribedAt: string;
}

export interface IReview {
  _id: string;
  user: { name: string; email: string; _id: string; profilePic: string };
  business: string;
  content: string;
}
