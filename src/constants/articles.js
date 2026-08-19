import { Users, FileText, Calendar, Activity } from "lucide-react";

export const ACTIVITY_CONFIG = {
  USER_REGISTERED: {
    title: "Nouvel utilisateur inscrit",
    icon: Users,
    iconColor: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  ARTICLE_PUBLISHED: {
    title: "Article publié",
    icon: FileText,
    iconColor: "text-purple-600",
    bgColor: "bg-purple-50",
  },
  EVENT_CREATED: {
    title: "Événement créé",
    icon: Calendar,
    iconColor: "text-amber-600",
    bgColor: "bg-amber-50",
  },
  DEFAULT: {
    title: "Activité récente",
    icon: Activity,
    iconColor: "text-emerald-600",
    bgColor: "bg-emerald-50",
  },
};
