import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AdminLayout from "./pages/admin/layout.jsx";
import DashboardAdmin from "./pages/admin/dashboard.jsx";
import EvenementAdmin from "./pages/admin/evenement.jsx";
import SiteOlympiqueAdmin from "./pages/admin/siteOlympique.jsx";
import BilleterieAdmin from "./pages/admin/billeterie.jsx";
import UserGestionAdmin from "./pages/admin/userGestion.jsx";
import LoginAuth from "./pages/auth/loginAuth.jsx";
import RegisterAuth from "./pages/auth/RegisterAuth.jsx";
import VerifyEmail from "./pages/auth/verifyEmail.jsx";
import AuthProvider from "./context/authContext.jsx";
import OAuthCallback from "./pages/auth/oAuth/callback.jsx";
import Onboarding  from "./pages/oboarding/onboarding.jsx";

const Root = () => (
  <AuthProvider>
    <Outlet />
    <ToastContainer position="top-right" autoClose={4000} />
  </AuthProvider>
);

const router = createBrowserRouter([
  {
    element: <Root />,
    children: [
      { path: "/", element: <App /> },
      {
        path: "/admin",
        element: <AdminLayout />,
        children: [
          { path: "dashboard", element: <DashboardAdmin /> },
          { path: "evenement", element: <EvenementAdmin /> },
          { path: "siteOlympique", element: <SiteOlympiqueAdmin /> },
          { path: "billeterie", element: <BilleterieAdmin /> },
          { path: "userGestion", element: <UserGestionAdmin /> },
        ],
      },
      {
        path: "/auth",
        children: [
          { path: "login", element: <LoginAuth /> },
          { path: "register", element: <RegisterAuth /> },
          { path: "verify-email", element: <VerifyEmail /> },
        ],
      },
      { path: "/oauth/callback", element: <OAuthCallback /> },
      {path: "/onboarding", element: <Onboarding />}
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
