import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { deleteBusiness } from "@/services/business.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface DeleteBusinessModalProps {
  businessId: string;
}

export const DeleteBusinessModal: React.FC<DeleteBusinessModalProps> = ({
  businessId,
}) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
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
      console.log(businessId);
      deleteBusinessMutation.mutate(businessId);
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" className="hover:scale-110">
          <FaTrash aria-label="Delete Business" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete business
            and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteBusiness}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
