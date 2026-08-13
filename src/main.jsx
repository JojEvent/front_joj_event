import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AdminLayout from "./pages/admin/layout.jsx";
import DashboardAdmin from "./pages/admin/dashboard.jsx";
import EvenementAdmin from "./pages/admin/evenement.jsx";
import SiteOlympiqueAdmin from "./pages/admin/siteOlympique.jsx";
import BilleterieAdmin from "./pages/admin/billeterie.jsx";
import UserGestionAdmin from "./pages/admin/userGestion.jsx";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { path: "/admin/dashboard", element: <DashboardAdmin /> },
      { path: "/admin/evenement", element: <EvenementAdmin /> },
      { path: "/admin/siteOlympique", element: <SiteOlympiqueAdmin /> },
      { path: "/admin/billeterie", element: <BilleterieAdmin /> },
      { path: "/admin/userGestion", element: <UserGestionAdmin /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
