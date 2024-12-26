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
import ErrorMessage from "./ErrorMessage";
import { Loader } from "lucide-react";
import { IUser, IUserProfile } from "@/types/user.type";
import { updateUserDetails } from "@/services/user.service";

interface EditUserModalProps {
  userId: string;
}

export const EditUserModal: React.FC<EditUserModalProps> = ({ userId }) => {
  const {
    data,
    status: userStatus,
    error: userError,
  } = useQuery<IUserProfile>({
    queryKey: ["user", userId],
    enabled: false,
  });

  const user = data?.user;
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profilePic, setProfilePic] = useState("");

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (updatedData: Partial<IUser>) => updateUserDetails(updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", userId] });
      setIsOpen(false);
    },
    onError: (error: any) => {
      alert(error.message || "Failed to update user");
    },
  });

  const handleSaveChanges = () => {
    const updatedData: Partial<IUser> = {
      name,
      email,
      profilePic,
    };
    mutation.mutate(updatedData);
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setProfilePic(user.profilePic as string);
    }
  }, [user]);

  if (userStatus === "pending")
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <Loader className="animate-spin" />
      </div>
    );
  if (userStatus === "error")
    return (
      <ErrorMessage
        message={userError?.message || "Error fetching business details"}
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
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Textarea
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="profilePic" className="text-right">
              Profile Picture
            </Label>
            <Input
              id="profilePic"
              value={profilePic}
              onChange={(e) => setProfilePic(e.target.value)}
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
