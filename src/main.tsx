import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import { ThemeProvider } from "@material-tailwind/react";
import { Campaigns } from "./pages/Campaigns/Campaigns";
import { Socials } from "./pages/Socials/Socials";
import { Profile } from "./pages/Profile/Profile";
import { Edit } from "./pages/Campaigns/Edit";
import { Login } from "./pages/Login/Login";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";


const router = createBrowserRouter([
  {
    path: "/dashboard",
    element: <PrivateRoute element={<App />} />, // Rota protegida
  },
  {
    path: "/",
    element: <Navigate to="/dashboard" />, // Redireciona para a rota "/"
  },
  {
    path: "/campaings",
    element: <PrivateRoute element={<Campaigns />} />, // Rota protegida
  },
  {
    path: "/socials",
    element: <PrivateRoute element={<Socials />} />, // Rota protegida
  },
  {
    path: "/profile",
    element: <PrivateRoute element={<Profile />} />, // Rota protegida
  },
  {
    path: "/login",
    element: <Login />, // Rota pública (não protegida)
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(

  <ThemeProvider>

    <RouterProvider router={router} />
  </ThemeProvider>

);
