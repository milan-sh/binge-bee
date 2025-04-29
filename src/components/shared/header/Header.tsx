import { Button } from "@/components/ui/button";
import Logo from "./Logo";
import {
  CircleUserRound,
  LayoutDashboard,
  User,
  Power,
  Search,
  Plus,
  SquarePlay,
  Twitter,
} from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";
import { Menu } from "lucide-react";
import { UseAuth } from "@/context/AuthProvider";
import { Link, useNavigate } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuGroup } from "@radix-ui/react-dropdown-menu";
import React from "react";

const Header = () => {
  const { toggleSidebar } = useSidebar();
  const { user, logout } = UseAuth();
  const navigate = useNavigate();

  const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const logoutSuccess: unknown = await logout();
      if (logoutSuccess) {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="p-4 sticky top-0 flex justify-between items-center z-20 backdrop-blur-3xl shadow-xl rounded-md gap-x-2">
      <div className="flex items-center gap-1">
        <button className="cursor-pointer" onClick={toggleSidebar}>
          <Menu color="white" size="28" />
        </button>
        <Logo />
      </div>
      <div className="hidden md:w-[40%] w-[50%] border-[1px] border-gray-700 rounded-full md:flex items-center">
        <input
          type="text"
          placeholder="Search"
          className="outline-none md:w-[90%] w-[80%] rounded-full text-white py-2 px-6"
        />
        <div className="h-10 flex items-center justify-center md:w-[10%] w-[20%] bg-gray-700 rounded-r-full">
          <Search color="gray" size={25} className="cursor-pointer" />
        </div>
      </div>
      {user ? (
        <div className="flex items-center justify-between gap-x-8">
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none w-fit">
              <button className="text-white bg-gray-800 px-4 py-1.5 rounded-full flex justify-between items-center text-lg gap-2 cursor-pointer">
                <Plus /> Create
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-20 md:w-44 bg-black text-white text-xl font-medium border border-primary">
              <DropdownMenuItem>
                <SquarePlay size={20} />
                <span>Upload Video</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Twitter />
                <span>Post a tweet</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none w-fit">
              <Avatar className="mr-4 size-9">
                <AvatarImage
                  className="object-cover object-top cursor-pointer"
                  src={user?.avatar}
                  alt={user?.fullName}
                />
                <AvatarFallback>{user?.fullName[0]}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-20 md:w-56 bg-black text-white border border-primary md:-mt-10 mr-7 md:mr-20 shadow-2xl">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <Link to={`/c/${user.username}`}>
                  <DropdownMenuItem>
                    <User />
                    <span>View your channel</span>
                  </DropdownMenuItem>
                </Link>
                <Link to={`/dashboard/${user._id}`}>
                  <DropdownMenuItem>
                    <LayoutDashboard />
                    <span>Dashbaord</span>
                  </DropdownMenuItem>
                </Link>
                <button onClick={handleLogout} className="w-full">
                  <DropdownMenuItem>
                    <Power />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </button>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        <Link to="/login">
          <Button variant="login">
            <span>
              <CircleUserRound size="28" />
            </span>
            Log in
          </Button>
        </Link>
      )}
    </nav>
  );
};

export default Header;
