export interface IBusiness {
  _id: string;
  name: string;
  description: string;
  category: string;
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
