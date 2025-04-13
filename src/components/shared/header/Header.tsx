import { Button } from "@/components/ui/button";
import Logo from "./Logo";
import { CircleUserRound } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar"
import { Menu } from 'lucide-react';


const Header = () => {
  const {toggleSidebar} = useSidebar()
  return (
    <nav className="p-4 sticky top-0 flex justify-between items-center">
      <div className="flex items-center gap-1">
        <button className="cursor-pointer" onClick={toggleSidebar}>
        <Menu color="white" size="28"/>
        </button>
        <Logo />
      </div>
      <Button variant="login">
        <span>
          <CircleUserRound size="28"/>
        </span>
        Log in
      </Button>
    </nav>
  );
};

export default Header;
