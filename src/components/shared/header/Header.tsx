import { Button } from "@/components/ui/button";
import Logo from "./Logo";
import { CircleUserRound } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";
import { Menu } from "lucide-react";
import { UseAuth } from "@/context/AuthProvider";
import { Link } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Header = () => {
  const { toggleSidebar } = useSidebar();
  const { user } = UseAuth();

  console.log(user)
  return (
    <nav className="p-4 sticky top-0 flex justify-between items-center z-20 backdrop-blur-md rounded-md">
      <div className="flex items-center gap-1">
        <button className="cursor-pointer" onClick={toggleSidebar}>
          <Menu color="white" size="28" />
        </button>
        <Logo />
      </div>
      {user ? (
        <Avatar className="mr-4 size-9">
          <AvatarImage className="object-cover object-top cursor-pointer" src={user?.avatar} alt={user?.fullName} />
          <AvatarFallback>{user?.fullName[0]}</AvatarFallback>
        </Avatar>
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
