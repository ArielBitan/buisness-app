import { fetchBusinessReviews, postReview } from "@/services/review.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { useState } from "react";
import ErrorMessage from "./ErrorMessage";
import { Button } from "./ui/button";
import { IReview } from "@/types/business.type";
import Review from "./Review";

interface ReviewListProps {
  businessId: string | undefined;
}

const ReviewList: React.FC<ReviewListProps> = ({ businessId }) => {
  const queryClient = useQueryClient();
  const [newReview, setNewReview] = useState("");
  const {
    data: reviews,
    status: reviewsStatus,
    error: reviewsError,
  } = useQuery({
    queryKey: ["reviews", businessId],
    queryFn: () => fetchBusinessReviews(businessId as string),
    enabled: !!businessId,
  });

  const addReviewMutation = useMutation({
    mutationFn: postReview,
    onSuccess: () => {
      if (businessId) {
        queryClient.invalidateQueries({ queryKey: ["reviews", businessId] });
      }
      setNewReview("");
    },
    onError: (error) => {
      console.error("Error posting review:", error);
    },
  });

  const handleCreateReview = () => {
    if (newReview.trim() && businessId) {
      addReviewMutation.mutate({
        businessId: businessId,
        content: newReview,
      });
    } else {
      console.error("Review content is empty or business ID is missing");
    }
  };

  if (reviewsStatus === "pending") return <Loader />;
  if (reviewsStatus === "error")
    return (
      <ErrorMessage
        message={reviewsError?.message || "Error fetching reviews"}
      />
    );

  return (
    <>
      <div className="text-2xl font-bold mt-4">Reviews:</div>
      <div className="flex flex-col items-center gap-2 w-1/2">
        <textarea
          placeholder="Create a review"
          className="w-full rounded p-2 text-black"
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
        ></textarea>
        <Button onClick={handleCreateReview} className="px-4 py-2 ">
          Submit Review
        </Button>
      </div>
      <ul className="w-full mt-4">
        {reviews?.map((review: IReview) => (
          <li key={review._id} className="mb-2">
            <Review
              _id={review._id}
              businessId={businessId}
              name={review.user.name}
              content={review.content}
              profilePic={review.user.profilePic}
            />
          </li>
        ))}
      </ul>
    </>
  );
};

export default ReviewList;
