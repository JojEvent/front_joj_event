import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import MainLayout from "./layouts/MainLayout.jsx";
import AdminLayout from "./pages/admin/layout.jsx";
import DashboardAdmin from "./pages/admin/dashboard.jsx";
import EvenementAdmin from "./pages/admin/evenement.jsx";
import SiteOlympiqueAdmin from "./pages/admin/siteOlympique.jsx";
import BilleterieAdmin from "./pages/admin/billeterie.jsx";
import UserGestionAdmin from "./pages/admin/userGestion.jsx";
import EspaceRedaction from "./pages/EspaceRedaction.jsx";
import ArticlePage from "./pages/ArticlePage.jsx";
import ArticlesList from "./pages/ArticlesList.jsx";
import ArticleDetail from "./pages/ArticleDetail.jsx";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: <ArticlePage /> },
      { path: "/redaction", element: <EspaceRedaction /> },
      { path: "/articles", element: <ArticlesList /> },
      { path: "/articles/:id", element: <ArticleDetail /> },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <DashboardAdmin /> },
      { path: "dashboard", element: <DashboardAdmin /> },
      { path: "evenement", element: <EvenementAdmin /> },
      { path: "siteOlympique", element: <SiteOlympiqueAdmin /> },
      { path: "billeterie", element: <BilleterieAdmin /> },
      { path: "userGestion", element: <UserGestionAdmin /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
