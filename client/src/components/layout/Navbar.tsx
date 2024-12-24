import { Popover, PopoverTrigger } from "@radix-ui/react-popover";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "./ThemeProvider";
import { Link } from "react-router-dom";
import { FiSun, FiMoon, FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

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
          } md:flex items-center space-y-4 md:space-y-0 absolute md:static top-16 right-0 bg-background md:bg-transparent w-full md:w-auto p-4 md:p-0 shadow-md md:shadow-none z-50`}
        >
          <li>
            <a
              href="/projects"
              className="relative font-bold hover:text-primary px-4 py-2 after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-primary after:origin-right after:transition-all after:duration-300 hover:after:w-full"
            >
              Businesses
            </a>
          </li>
          <li>
            <a
              href="/projectInfo"
              className="relative font-bold hover:text-primary px-4 py-2 after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-primary after:origin-right after:transition-all after:duration-300 hover:after:w-full"
            >
              Create Business
            </a>
          </li>
          <li>
            <a
              href="/about"
              className="relative font-bold hover:text-primary px-4 py-2 after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-primary after:origin-right after:transition-all after:duration-300 hover:after:w-full"
            >
              About{" "}
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
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="secondary"
                  onClick={openModal}
                  className="border border-border bg-secondary text-foreground hover:bg-secondary/40"
                >
                  Login
                </Button>
              </PopoverTrigger>
            </Popover>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
