import { Button } from "@/components/ui/button";
import Logo from "./Logo";
import { CircleUserRound, LayoutDashboard, User, Power } from "lucide-react";
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
  const navigate = useNavigate()

  const handleLogout = async(e: React.MouseEvent<HTMLButtonElement>)=>{
    e.preventDefault();
    const logoutSuccess : unknown = await logout();
    if(logoutSuccess){
      navigate("/login")
    }
  }

  return (
    <nav className="p-4 sticky top-0 flex justify-between items-center z-20 backdrop-blur-md rounded-md">
      <div className="flex items-center gap-1">
        <button className="cursor-pointer" onClick={toggleSidebar}>
          <Menu color="white" size="28" />
        </button>
        <Logo />
      </div>
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger className="border-none outline-none">
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
              <DropdownMenuItem>
                <User />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <LayoutDashboard />
                <span>Dashbaord</span>
              </DropdownMenuItem>
              <button onClick={handleLogout} className="w-full">
                <DropdownMenuItem>
                  <Power />
                  <span>Logout</span>
                </DropdownMenuItem>
              </button>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
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
