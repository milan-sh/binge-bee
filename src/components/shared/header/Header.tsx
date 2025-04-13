import { Button } from "@/components/ui/button"
import Logo from "./Logo"
import { CircleUserRound } from 'lucide-react';


const Header = () => {
  return (
    <nav className="p-4  flex justify-between items-center">
      <Logo/>
       <Button variant="login"><span><CircleUserRound/></span> Login</Button> 
    </nav>
  )
}

export default Header
