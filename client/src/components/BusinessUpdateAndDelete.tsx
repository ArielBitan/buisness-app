import { useUser } from "@/context/userContext";
import {
  checkBusinessOwnership,
  deleteBusiness,
} from "@/services/business.service";
import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

interface BusinessUpdateAndDeleteProps {
  businessId: string | undefined;
}

const BusinessUpdateAndDelete: React.FC<BusinessUpdateAndDeleteProps> = ({
  businessId,
}) => {
  const { user } = useUser();
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !businessId) return;

    const fetchOwnershipStatus = async () => {
      try {
        const owned = await checkBusinessOwnership(businessId);
        setIsOwner(owned);
      } catch (err) {
        console.error("Error checking ownership status:", err);
      }
    };

    fetchOwnershipStatus();
  }, [businessId, user]);

  const deleteBusinessMutation = useMutation({
    mutationFn: deleteBusiness,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["business", businessId] });
      navigate("/businesses");
    },
    onError: (error) => {
      console.error("Error deleting business:", error);
    },
  });

  const handleDeleteBusiness = () => {
    if (businessId) {
      deleteBusinessMutation.mutate(businessId);
    }
  };

  if (!businessId) {
    return <p>Invalid business ID.</p>;
  }

  return (
    <div>
      {isOwner && (
        <FaTrash
          className="hover:scale-110 hover:cursor-pointer text-red-500"
          onClick={handleDeleteBusiness}
          aria-label="Delete Business"
        />
      )}
    </div>
  );
};

export default BusinessUpdateAndDelete;
