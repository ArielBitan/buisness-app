import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import React, { useEffect, useState } from "react";
import { useUser } from "@/context/userContext";
import { checkReviewOwnership, deleteReview } from "@/services/review.service";
import { FaTrash } from "react-icons/fa";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface ReviewProps {
  _id: string;
  name: string;
  postId: string | undefined;
  content: string;
  profilePic: string;
}
const Review: React.FC<ReviewProps> = ({
  name,
  content,
  profilePic,
  _id,
  postId,
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
      if (postId) {
        queryClient.invalidateQueries({ queryKey: ["reviews", postId] });
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
          <span className="font-extrabold text-lg mb-2">{name} : </span>
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
