import { CircleUserRound, Home, TvMinimalPlay, History, Settings } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useSidebar } from "@/components/ui/sidebar";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function AppSidebar() {
    const {open} = useSidebar()
  return (
    <Sidebar collapsible="icon" variant="sidebar" className="h-[90vh] top-20 left-3 border-none transition-none">
      <SidebarContent className="bg-black text-white p-0">
        {/* Group 1: Home & Subscriptions */}
        <SidebarGroup className={`${open ? "border-b border-gray-800" : "" }`}>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="my-1">
                  <NavLink to="/" className={({ isActive }) => 
                    isActive ? "text-white font-medium" : ""
                  }>
                    <span><Home /></span>
                    <span className="md:text-lg font-normal ml-3">Home</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="my-1">
                  <NavLink to="/subscriptions" className={({ isActive }) => 
                    isActive ? "text-white font-medium" : ""
                  }>
                    <span><TvMinimalPlay /></span>
                    <span className="md:text-lg font-normal ml-3">Subscriptions</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Group 2: You & History */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="my-1">
                  <NavLink to="/you" className={({ isActive }) => 
                    isActive ? "text-white font-medium" : ""
                  }>
                    <span><CircleUserRound /></span>
                    <span className="md:text-lg font-normal ml-3">You</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="my-1">
                  <NavLink to="/history" className={({ isActive }) => 
                    isActive ? "text-white font-medium" : ""
                  }>
                    <span><History /></span>
                    <span className="md:text-lg font-normal ml-3">History</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Group 3: Sign In Prompt */}
        <SidebarGroup className={`${open ? "block" : "hidden" }`}>
          <SidebarGroupContent>
            <div className="px-4 py-6 border-t border-b border-gray-800">
              <p className="text-sm mb-3">Sign in to like videos, comment and subscribe.</p>
              <NavLink to="/signin">
                <button className="w-full py-1.5 px-4 rounded-full border border-blue-500 text-blue-500 font-medium hover:bg-primary hover:text-white hover:border-white hover:cursor-pointer hover:bg-opacity-10 transition">
                  Log in
                </button>
              </NavLink>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Group 4: Settings */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="my-1">
                  <NavLink to="/settings" className={({ isActive }) => 
                    isActive ? "text-white font-medium" : ""
                  }>
                    <span><Settings /></span>
                    <span className="md:text-lg font-normal ml-3">Settings</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}