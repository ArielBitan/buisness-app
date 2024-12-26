import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaRegEdit } from "react-icons/fa";
import { Textarea } from "./ui/textarea";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { IBusiness } from "@/types/business.type";
import ErrorMessage from "./ErrorMessage";
import { Loader } from "lucide-react";
import { updateBusiness } from "../services/business.service";

interface EditBusinessModalProps {
  businessId: string;
}

export const EditBusinessModal: React.FC<EditBusinessModalProps> = ({
  businessId,
}) => {
  const {
    data: business,
    status: businessStatus,
    error: businessError,
  } = useQuery<IBusiness>({
    queryKey: ["business", businessId],
    enabled: false,
  });

  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (updatedData: Partial<IBusiness>) =>
      updateBusiness(businessId, updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["business", businessId] });
      setIsOpen(false);
    },
    onError: (error: any) => {
      alert(error.message || "Failed to update business");
    },
  });

  const handleSaveChanges = () => {
    const updatedData: Partial<IBusiness> = {
      name,
      description,
      image,
    };
    mutation.mutate(updatedData);
  };

  useEffect(() => {
    if (business) {
      setName(business.name);
      setDescription(business.description);
      setImage(business.image);
    }
  }, [business]);

  if (businessStatus === "pending")
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <Loader className="animate-spin" />
      </div>
    );
  if (businessStatus === "error")
    return (
      <ErrorMessage
        message={businessError?.message || "Error fetching business details"}
      />
    );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="hover:scale-110">
          <FaRegEdit />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Edit business</DialogTitle>
          <DialogDescription>
            Make changes to your business here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Business Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Business Description
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="image" className="text-right">
              Business Image
            </Label>
            <Input
              id="image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSaveChanges} type="submit">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
