import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { fetchBusinessById } from "@/services/business.service";
import { Loader } from "lucide-react";
import ErrorMessage from "@/components/ErrorMessage";
import { IReview } from "@/types/business.type";
import Review from "@/components/Review";
import BusinessDetailsImage from "@/components/BusinessDetailsImage";
import { Button } from "@/components/ui/button";
import { fetchBusinessReviews, postReview } from "@/services/review.service";

const BusinessDetailsPage = () => {
  const { id } = useParams();
  const [newReview, setNewReview] = useState(""); // State to track review content
  const queryClient = useQueryClient();

  const {
    data: business,
    status: businessStatus,
    error: businessError,
  } = useQuery({
    queryKey: ["business", id],
    queryFn: () => fetchBusinessById(id as string),
    enabled: !!id,
  });

  const {
    data: reviews,
    status: reviewsStatus,
    error: reviewsError,
  } = useQuery({
    queryKey: ["reviews", id],
    queryFn: () => fetchBusinessReviews(id as string),
    enabled: !!id,
  });

  const addReviewMutation = useMutation({
    mutationFn: postReview,
    onSuccess: () => {
      if (id) {
        queryClient.invalidateQueries({ queryKey: ["reviews", id] });
      }
      setNewReview("");
    },
    onError: (error) => {
      console.error("Error posting review:", error);
    },
  });

  const handleCreateReview = () => {
    if (newReview.trim() && id) {
      addReviewMutation.mutate({
        businessId: id,
        content: newReview,
      });
    } else {
      console.error("Review content is empty or business ID is missing");
    }
  };

  if (businessStatus === "pending") return <Loader />;
  if (businessStatus === "error")
    return (
      <ErrorMessage
        message={businessError?.message || "Error fetching business details"}
      />
    );

  if (reviewsStatus === "pending") return <Loader />;
  if (reviewsStatus === "error")
    return (
      <ErrorMessage
        message={reviewsError?.message || "Error fetching reviews"}
      />
    );

  return (
    <div className="flex flex-col items-center justify-center p-6 px-20 gap-4">
      <div className="text-4xl font-bold">{business.name}</div>
      <BusinessDetailsImage
        image={business.image}
        name={business.name}
        businessId={business._id}
      />
      <div className="text-2xl px-20 mt-4 text-primary/85">
        {business.description}
      </div>
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
              postId={id}
              name={review.user.name}
              content={review.content}
              profilePic={review.user.profilePic}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BusinessDetailsPage;
