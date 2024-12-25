import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "./ThemeProvider";
import { Link, useNavigate } from "react-router-dom";
import { FiSun, FiMoon, FiMenu, FiX } from "react-icons/fi";
import { useUser } from "@/context/userContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { LogOut } from "lucide-react";
import { IUser } from "@/types/user.type";
import { useToast } from "@/hooks/use-toast";
import { logoutUser } from "@/services/user.service";

const UserMenu = ({ user }: { user: IUser }) => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogout = async () => {
    logoutUser();
    navigate("/login");
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="cursor-pointer mt-4">
          <AvatarImage
            className="rounded-full w-10 h-10"
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
          <Link to="/profile">Profile</Link>
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
  );
};

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, fetchUser } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchUserData = async () => {
      await fetchUser();
      setIsLoading(false);
    };
    fetchUserData();
  }, []);
  console.log(user);
  if (isLoading) {
    return (
      <nav className="sticky top-0 z-50 bg-background text-foreground border-b border-border shadow-sm">
        <div className="flex justify-between items-center p-4">
          {/* Logo */}
          <Link
            to="/"
            className="text-3xl font-extrabold flex items-center justify-center space-x-1 transition-transform duration-300 hover:scale-110"
          >
            Business-App
          </Link>
        </div>
      </nav>
    );
  }

  return (
    <nav className="sticky top-0 z-50 bg-background text-foreground border-b border-border shadow-sm">
      <div className="flex justify-between items-center p-4">
        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-extrabold flex items-center justify-center space-x-1 transition-transform duration-300 hover:scale-110"
        >
          Business-App
        </Link>

        {/* Hamburger Menu */}
        <button
          className="block md:hidden text-primary focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

        {/* Menu */}
        <ul
          className={`${
            isMenuOpen ? "block" : "hidden"
          } md:flex items-center space-y-4 gap-4 md:space-y-0 absolute md:static top-16 right-0 bg-background md:bg-transparent w-full md:w-auto p-4 md:p-0 shadow-md md:shadow-none z-50`}
        >
          <li>
            <a
              href="/create-business"
              className="relative font-bold hover:text-primary after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-primary after:origin-right after:transition-all after:duration-300 hover:after:w-full"
            >
              Add Business
            </a>
          </li>

          <li>
            <a
              href="/businesses"
              className="relative font-bold hover:text-primary after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-primary after:origin-right after:transition-all after:duration-300 hover:after:w-full"
            >
              Businesses
            </a>
          </li>
          <li>
            <a
              href="/about"
              className="relative font-bold hover:text-primary after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-primary after:origin-right after:transition-all after:duration-300 hover:after:w-full"
            >
              About
            </a>
          </li>
          <li>
            <div className="flex items-center space-x-2 gap-2 mr-4">
              <span className="text-sm text-muted-foreground">
                {theme === "light" ? <FiSun size={20} /> : <FiMoon size={20} />}
              </span>
              <Switch
                checked={theme === "dark"}
                onCheckedChange={toggleTheme}
              />
            </div>
          </li>
          <li>
            {user ? (
              <UserMenu user={user} />
            ) : (
              <Link to={"/login"}>
                <Button
                  variant="secondary"
                  className="border border-border bg-secondary text-foreground hover:bg-secondary/40"
                >
                  Login
                </Button>
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
