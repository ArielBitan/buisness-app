import { useContext, useEffect, useState } from "react";
import { GoBookmark, GoBookmarkFill } from "react-icons/go";
import { useUser } from "@/context/userContext";
import {
  checkSubscriptionStatus,
  subscribeToBusiness,
} from "@/services/subscription.service";
import { SocketContext } from "@/context/socketContext";
import { toast } from "@/hooks/use-toast";

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
  const socket = useContext(SocketContext);
  useEffect(() => {
    if (!user) {
      return;
    }

    const fetchSubscriptionStatus = async () => {
      try {
        const subscribed = await checkSubscriptionStatus(businessId);
        setIsSubscribed(subscribed);
      } catch (err) {
        console.error("Error checking subscription status:", err);
      }
    };
    if (isSubscribed && socket) {
      socket.emit("subscribe", businessId);
      socket.on("businessUpdated", (data) => {
        if (data.businessId === businessId) {
          toast({
            title: "Business update received:",
            description: data.message,
          });
        }
      });
      socket.on("businessDeleted", (data) => {
        if (data.businessId === businessId) {
          toast({
            title: "Business update received:",
            description: data.message,
          });
        }
      });
    }
    fetchSubscriptionStatus();
  }, [businessId, isSubscribed]);

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
