import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import React from "react";

interface CommentProps {
  name: string;
  content: string;
  profilePic: string;
}
const Comment: React.FC<CommentProps> = ({ name, content, profilePic }) => {
  return (
    <div className="bg-primary/20 p-6 rounded font-poppins">
      <div className="flex items-center gap-2">
        <Avatar className="pb-4 px-2">
          <AvatarImage
            className="rounded-full w-10 h-10"
            src={profilePic}
            alt="profile-pic"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <span className="font-extrabold mb-2">{name} : </span>
      </div>
      <div className="font-thin text-primary/60"> {content}</div>
    </div>
  );
};

export default Comment;
