import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchBusinessById } from "@/services/business.service";
import { Loader } from "lucide-react";
import ErrorMessage from "@/components/ErrorMessage";
import BusinessDetailsImage from "@/components/BusinessDetailsImage";
import ReviewList from "@/components/ReviewList";
import BusinessUpdateAndDelete from "@/components/BusinessUpdateAndDelete";

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

  if (businessStatus === "pending") return <Loader />;
  if (businessStatus === "error")
    return (
      <ErrorMessage
        message={businessError?.message || "Error fetching business details"}
      />
    );

  return (
    <div className="flex flex-col items-center justify-center p-6 px-20 gap-4">
      <div className="text-4xl font-bold">{business.name}</div>
      <BusinessUpdateAndDelete businessId={id} />
      <BusinessDetailsImage
        image={business.image}
        name={business.name}
        businessId={business._id}
      />
      <div className="text-2xl px-20 mt-4 text-primary/85">
        {business.description}
      </div>
      <ReviewList businessId={id} />
    </div>
  );
};

export default BusinessDetailsPage;
