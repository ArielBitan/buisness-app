import { useQuery } from "@tanstack/react-query";
import { fetchAllBusinesses } from "@/services/business.service";
import { Loader } from "lucide-react";
import ErrorMessage from "./ErrorMessage";
import { Link } from "react-router-dom";
import BusinessCard from "./BusinessCard";

interface BusinessListProps {
  limit: number;
}

const BusinessList: React.FC<BusinessListProps> = ({ limit }) => {
  const {
    data: businesses,
    status,
    error,
  } = useQuery({
    queryKey: ["businesses"],
    queryFn: () => fetchAllBusinesses(limit),
  });

  if (status === "pending")
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <Loader className="animate-spin" />
      </div>
    );
  if (status === "error") return <ErrorMessage message={error.message} />;

  return (
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 mx-4 md:grid-cols-3 lg:grid-cols-4">
      {businesses.map((business) => (
        <li
          key={business._id}
          className="bg-primary/5 p-4 rounded-lg hover:scale-105 shadow-md shadow-primary/30 hover:shadow-lg"
        >
          <Link to={`/businesses/${business._id}`}>
            <BusinessCard business={business} />
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default BusinessList;
