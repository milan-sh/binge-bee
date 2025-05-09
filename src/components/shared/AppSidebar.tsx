import {
  CircleUserRound,
  Home,
  TvMinimalPlay,
  History,
  Settings,
  ListVideo,
  ThumbsUp,
  Twitter,
} from "lucide-react";
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
import { UseAuth } from "@/context/AuthProvider";

export function AppSidebar() {
  const { open } = useSidebar();
  const { user } = UseAuth();

  const loggedInUserNav = [
    {
      id: 1,
      icon: History,
      title: "History",
      link: "/history",
    },
    {
      id: 2,
      icon: ListVideo,
      title: "Playlists",
      link: "/playlists",
    },
    {
      id: 3,
      icon: ThumbsUp,
      title: "Liked videos",
      link: "/liked-videos",
    },
    {
      id: 4,
      icon: Twitter,
      title: "Tweets",
      link: "/tweets",
    },
  ];

  return (
    <Sidebar
      collapsible="icon"
      variant="sidebar"
      className="h-[90vh] top-20 left-3 border-none transition-none"
    >
      <SidebarContent className="bg-black text-white p-0">
        {/* Group 1: Home & Subscriptions */}
        <SidebarGroup className={`${open ? "border-b border-gray-800" : ""}`}>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="my-1">
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      isActive ? "text-white font-medium" : ""
                    }
                  >
                    <span>
                      <Home />
                    </span>
                    <span className="md:text-lg font-normal ml-3">Home</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="my-1">
                  <NavLink
                    to="/subscriptions"
                    className={({ isActive }) =>
                      isActive ? "text-white font-medium" : ""
                    }
                  >
                    <span>
                      <TvMinimalPlay />
                    </span>
                    <span className="md:text-lg font-normal ml-3">
                      Subscriptions
                    </span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Group 2: You, History, Playlists, Liked Videos & Twet */}
        <SidebarGroup className={`py-2 ${user? "border-b" : ""} border-gray-800`}>
          <SidebarGroupContent>
            <SidebarMenu>
              {!user && (
                <SidebarMenuItem>
                  <SidebarMenuButton asChild className="my-1">
                    <NavLink
                      to="/you"
                      className={({ isActive }) =>
                        isActive ? "text-white font-medium" : ""
                      }
                    >
                      <span>
                        <CircleUserRound />
                      </span>
                      <span className="md:text-lg font-normal ml-3">You</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
              {user && loggedInUserNav.map((menu) => (
                <SidebarMenuItem key={menu.id}> 
                  <SidebarMenuButton asChild className="my-1">
                    <NavLink
                      to={menu.link}
                      className={({ isActive }) =>
                        isActive ? "text-white font-medium" : ""
                      }
                    >
                      <span>
                        <menu.icon />
                      </span>
                      <span className="md:text-lg font-normal ml-3">
                        {menu.title}
                      </span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Group 3: Sign In Prompt */}
        {!user && (
          <SidebarGroup className={`${open ? "block" : "hidden"}`}>
            <SidebarGroupContent>
              <div className="px-4 py-6 border-t border-b border-gray-800">
                <p className="text-sm mb-3">
                  Sign in to like videos, comment and subscribe.
                </p>
                <NavLink to="/login">
                  <button className="w-full py-1.5 px-4 rounded-full border border-blue-500 text-blue-500 font-medium hover:bg-primary hover:text-white hover:border-white hover:cursor-pointer hover:bg-opacity-10 transition">
                    Log in
                  </button>
                </NavLink>
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* Group 4: Settings */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="my-1">
                  <NavLink
                    to="/settings"
                    className={({ isActive }) =>
                      isActive ? "text-white font-medium" : ""
                    }
                  >
                    <span>
                      <Settings />
                    </span>
                    <span className="md:text-lg font-normal ml-3">
                      Settings
                    </span>
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
