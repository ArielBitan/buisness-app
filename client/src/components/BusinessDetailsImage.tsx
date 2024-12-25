import { useEffect, useState } from "react";
import {
  subscribeToBusiness,
  checkSubscriptionStatus,
} from "@/services/business.service";
import { GoBookmark, GoBookmarkFill } from "react-icons/go";
import { useUser } from "@/context/userContext";

interface BusinessDetailsImage {
  businessId: string;
  image: string;
  name: string;
}

const BusinessDetailsImage: React.FC<BusinessDetailsImage> = ({
  image,
  name,
  businessId,
}) => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { user } = useUser();
  useEffect(() => {
    if (!user) {
      return;
    }
    const fetchSubscriptionStatus = async () => {
      try {
        const subscribed = await checkSubscriptionStatus(businessId);
        console.log(subscribed);
        setIsSubscribed(subscribed);
      } catch (err) {
        console.error("Error checking subscription status:", err);
      }
    };
    fetchSubscriptionStatus();
  }, [businessId]);

  // Handle subscription toggle
  const handleToggleSubscription = async () => {
    try {
      await subscribeToBusiness(businessId);
      setIsSubscribed(!isSubscribed);
    } catch (err) {
      console.error("Error toggling subscription:", err);
    }
  };

  return (
    <div className="w-full h-[400px] relative">
      {isSubscribed ? (
        <GoBookmarkFill
          onClick={handleToggleSubscription}
          className="absolute top-4 right-4 z-30 cursor-pointer hover:scale-110 text-4xl"
        />
      ) : (
        <GoBookmark
          onClick={handleToggleSubscription}
          className="absolute top-4 right-4 z-30 cursor-pointer hover:scale-110 text-4xl"
        />
      )}
      <img className="object-cover w-full h-full" src={image} alt={name} />
    </div>
  );
};

export default BusinessDetailsImage;
