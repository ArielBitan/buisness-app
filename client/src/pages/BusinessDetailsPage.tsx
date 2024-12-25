import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  fetchBusinessById,
  fetchBusinessReviews,
} from "@/services/business.service";
import { Loader } from "lucide-react";
import ErrorMessage from "@/components/ErrorMessage";
import { IReview } from "@/types/business.type";
import Comment from "@/components/Comment";
import BusinessDetailsImage from "@/components/BusinessDetailsImage";

const BusinessDetailsPage = () => {
  const { id } = useParams();
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
      <ul>
        {reviews?.map((review: IReview) => (
          <li key={review._id} className="mb-2">
            <Comment
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
