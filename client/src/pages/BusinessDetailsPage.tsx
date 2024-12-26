import { useQuery } from "@tanstack/react-query";
import { fetchBusinessById } from "@/services/business.service";
import { Loader } from "lucide-react";
import ErrorMessage from "@/components/ErrorMessage";
import BusinessDetailsImage from "@/components/BusinessDetailsImage";
import ReviewList from "@/components/ReviewList";
import BusinessUpdateAndDelete from "@/components/BusinessUpdateAndDelete";
import { useParams } from "react-router-dom";

const BusinessDetailsPage = () => {
  const { id: businessId } = useParams();
  const {
    data: business,
    status: businessStatus,
    error: businessError,
  } = useQuery({
    queryKey: ["business", businessId],
    queryFn: () => fetchBusinessById(businessId as string),
    enabled: !!businessId,
  });

  if (businessStatus === "pending")
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <Loader className="animate-spin" />
      </div>
    );
  if (businessStatus === "error" || !businessId)
    return (
      <ErrorMessage
        message={businessError?.message || "Error fetching business details"}
      />
    );

  return (
    <div className="flex flex-col items-center justify-center p-6 px-20 gap-4">
      <div className="text-4xl font-bold">{business.name}</div>
      <div className="flex items-center justify-end w-full">
        <BusinessUpdateAndDelete businessId={businessId} />
      </div>
      <BusinessDetailsImage
        image={business.image}
        name={business.name}
        businessId={business._id}
      />
      <div className="text-2xl px-20 mt-4 text-primary/85">
        {business.description}
      </div>
      <ReviewList businessId={businessId} />
    </div>
  );
};

export default BusinessDetailsPage;
