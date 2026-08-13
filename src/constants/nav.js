import {
  BilleterieIcon,
  DashboardIcon,
  EventIcon,
  LocationIcon,
  UserAdminIcon,
} from "../assets";

export const navLinks = [
  {
    id: 1,
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: DashboardIcon,
  },
  {
    id: 2,
    name: "Evenement",
    path: "/admin/evenement",
    icon: EventIcon,
  },
  {
    id: 3,
    name: "Site Olympique",
    path: "/admin/siteOlympique",
    icon: LocationIcon,
  },
  {
    id: 4,
    name: "Billeterie",
    path: "/admin/billeterie",
    icon: BilleterieIcon,
  },
  {
    id: 5,
    name: "Utilisateur",
    path: "/admin/userGestion",
    icon: UserAdminIcon,
  },
];
