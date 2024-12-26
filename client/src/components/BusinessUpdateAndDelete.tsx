import { useUser } from "@/context/userContext";
import { checkBusinessOwnership } from "@/services/business.service";
import { useEffect, useState } from "react";
import { EditBusinessModal } from "./EditBusinessModal";
import { DeleteBusinessModal } from "./DeleteBusinessModal";

interface BusinessUpdateAndDeleteProps {
  businessId: string;
}

const BusinessUpdateAndDelete: React.FC<BusinessUpdateAndDeleteProps> = ({
  businessId,
}) => {
  const { user } = useUser();
  const [isOwner, setIsOwner] = useState<boolean>(false);

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

  if (!businessId) {
    return <p>Invalid business ID.</p>;
  }

  return (
    <div>
      {isOwner && (
        <div className="flex gap-4 items-center">
          <EditBusinessModal businessId={businessId} />
          <DeleteBusinessModal businessId={businessId} />
        </div>
      )}
    </div>
  );
};

export default BusinessUpdateAndDelete;
