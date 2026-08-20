import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";

import "./index.css";
import "leaflet/dist/leaflet.css";
import "react-toastify/dist/ReactToastify.css";

import AuthProvider from "./context/authContext.jsx";

// Pages principales
import Acceuil from "./pages/acceuil.jsx";
import CartePage from "./pages/CartePage.jsx";
import EvenementsPage from "./pages/Evenementspage.jsx";
import EventDetailPage from "./pages/EventDetailPage.jsx";
import PageResultats from "./pages/resultats.jsx";
import CartPage from "./pages/CartPage.jsx";
import PaiementPage from "./pages/PaiementPage.jsx";
import SuccesPage from "./pages/SuccesPage.jsx";
import ProfilePage from "./pages/profile.jsx";
import Favoris from "./pages/favoris.jsx";
import MesBilletsPage from "./pages/MesBilletsPage.jsx";

// Pages Articles & Rédaction
import EspaceRedaction from "./pages/EspaceRedaction.jsx";
import ArticlePage from "./pages/ArticlePage.jsx";
import ArticlesList from "./pages/ArticlesList.jsx";
import ArticleDetail from "./pages/ArticleDetail.jsx";

// Pages Auth
import LoginAuth from "./pages/auth/loginAuth.jsx";
import RegisterAuth from "./pages/auth/RegisterAuth.jsx";
import VerifyEmail from "./pages/auth/verifyEmail.jsx";
import OAuthCallback from "./pages/auth/oAuth/callback.jsx";
import Onboarding from "./pages/oboarding/onboarding.jsx";

// Pages Admin
import AdminLayout from "./pages/admin/layout.jsx";
import DashboardAdmin from "./pages/admin/dashboard.jsx";
import EvenementAdmin from "./pages/admin/evenement.jsx";
import SiteOlympiqueAdmin from "./pages/admin/siteOlympique.jsx";
import BilleterieAdmin from "./pages/admin/billeterie.jsx";
import UserGestionAdmin from "./pages/admin/userGestion.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import Assistant from "./composants/assistant/Assistant.jsx";

const queryClient = new QueryClient();

// Composant racine avec AuthProvider et ToastContainer
const Root = () => (
  <AuthProvider>
    <CartProvider>
    <Outlet />
    <ToastContainer position="top-right" autoClose={4000} />
    </CartProvider>
  </AuthProvider>
);

// Configuration des routes
const router = createBrowserRouter([
  {
    element: <Root />,
    children: [
      { path: "/", element: <Acceuil /> },
      { path: "/evenements", element: <EvenementsPage /> },
      { path: "/carte", element: <CartePage /> },
      { path: "/evenements/:id", element: <EventDetailPage /> },
      { path: "/resultat", element: <PageResultats /> },
      { path: "/resultats", element: <PageResultats /> },
      { path: "/panier", element: <CartPage /> },
      { path: "/paiement", element: <PaiementPage /> },
      { path: "/succes", element: <SuccesPage /> },
      { path: "/profil", element: <ProfilePage /> },
      { path: "/favoris", element: <Favoris /> },
      { path: "/souhaits", element: <Favoris /> },
      { path: "/billets", element: <MesBilletsPage /> },

      // Routes Articles et Rédaction
      { path: "/redaction", element: <EspaceRedaction /> },
      { path: "/articles", element: <ArticlesList /> },
      { path: "/articles/:id", element: <ArticleDetail /> },
      { path: "/article", element: <ArticlePage /> },

      { path: "/assistant", element: <Assistant /> },

      // Routes Admin
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

      // Routes Auth
      {
        path: "/auth",
        children: [
          { path: "login", element: <LoginAuth /> },
          { path: "register", element: <RegisterAuth /> },
          { path: "verify-email", element: <VerifyEmail /> },
        ],
      },
      { path: "/oauth/callback", element: <OAuthCallback /> },
      { path: "/onboarding", element: <Onboarding /> },
      { path: "*", element: <Acceuil /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
