import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import React, { useEffect, useState } from "react";
import { useUser } from "@/context/userContext";
import { checkReviewOwnership, deleteReview } from "@/services/review.service";
import { FaTrash } from "react-icons/fa";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";

interface ReviewProps {
  _id: string;
  userId: string;
  name: string;
  businessId: string | undefined;
  content: string;
  profilePic: string;
}
const Review: React.FC<ReviewProps> = ({
  name,
  content,
  profilePic,
  userId,
  _id,
  businessId,
}) => {
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const { user } = useUser();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!user) {
      return;
    }
    const fetchOwnershipStatus = async () => {
      try {
        const owned = await checkReviewOwnership(_id);
        setIsOwner(owned);
      } catch (err) {
        console.error("Error checking subscription status:", err);
      }
    };
    fetchOwnershipStatus();
  }, [_id]);

  const deleteReviewMutation = useMutation({
    mutationFn: deleteReview,
    onSuccess: () => {
      if (businessId) {
        queryClient.invalidateQueries({ queryKey: ["reviews", businessId] });
      }
    },
    onError: (error) => {
      console.error("Error posting review:", error);
    },
  });

  const handleDeleteReview = () => {
    deleteReviewMutation.mutate(_id);
  };
  return (
    <div className="bg-primary/20 p-6 rounded font-poppins">
      <div className="flex items-center gap-2 justify-between">
        <div className="flex items-center gap-2">
          <Avatar className="pb-4 px-2">
            <AvatarImage
              className="rounded-full w-10 h-10"
              src={profilePic}
              alt="profile-pic"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Link
            to={`/profile/${userId}`}
            className="hover:cursor-pointer hover:underline"
          >
            <span className="font-extrabold text-lg mb-2">{name} : </span>
          </Link>
        </div>
        {isOwner && (
          <FaTrash
            className="hover:scale-110 hover:cursor-pointer"
            onClick={handleDeleteReview}
          />
        )}
      </div>
      <div className="font-thin text-primary/60"> {content}</div>
    </div>
  );
};

export default Review;
