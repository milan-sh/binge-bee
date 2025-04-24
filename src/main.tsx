import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { SidebarProvider } from "@/components/ui/sidebar";
import { createBrowserRouter, RouterProvider } from "react-router";
import { Home, Login, Signup, Subscriptions, Profile } from "./pages/index.ts";
import { AuthProvider } from "./context/AuthProvider.tsx";
import { ProtectedRoutes } from "./components/index.ts";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthProvider>
        <SidebarProvider>
          <App />
        </SidebarProvider>
      </AuthProvider>
    ),
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path:"signup",
        element:<Signup/>
      },
      {
        path: "/subscriptions",
        element: (<ProtectedRoutes>
          <Subscriptions/>
        </ProtectedRoutes>)
      },
      {
        path:"c/:username",
        element:(
          <ProtectedRoutes>
            <Profile/>
          </ProtectedRoutes>
        )
      }
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
