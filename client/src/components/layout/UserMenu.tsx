import { useUser } from "@/context/userContext";
import { logoutUser } from "@/services/user.service";
import { IUser } from "@/types/user.type";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import Notifications from "./Notifications";

const UserMenu = ({ user }: { user: IUser }) => {
  const { setUser } = useUser();
  const handleLogout = async () => {
    try {
      await logoutUser();
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Notifications />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mr-1 mt-2 bg-secondary p-2 rounded-lg shadow-lg">
          <DropdownMenuLabel className="font-bold mb-2">
            Notifications:
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem></DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar className="cursor-pointer">
            <AvatarImage
              className="rounded-full w-10 h-10 mb-2"
              src={user.profilePic}
              alt="user-avatar"
            />
            <AvatarFallback className="rounded-full">CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mr-1 mt-2 bg-secondary p-2 rounded-lg shadow-lg">
          <DropdownMenuLabel className="font-bold mb-2">
            My Account:
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="mb-1 hover:bg-primary/10 rounded">
            <Link to={`/profile/${user._id}`}>Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleLogout}
            className="flex gap-2 hover:cursor-pointer hover:bg-primary/10 rounded"
          >
            <LogOut />
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserMenu;
