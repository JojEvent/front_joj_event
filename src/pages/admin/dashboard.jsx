import React, { useEffect, useState } from "react";
import HeaderAdmin from "../../composants/admin/header";
import { useAuth } from "../../context/authContext";
import Card from "../../composants/admin/card";
import { Users, Building2, Newspaper, Calendar } from "lucide-react";
import EvolutionInscriptions from "../../composants/admin/graph";
import RecentArticles from "../../composants/admin/recentArticles";
import RecentActivities from "../../composants/admin/recentActivities";
import { instanceApi } from "../../services/api";

const DashboardAdmin = () => {
  const { allProfiles } = useAuth();
  const [profiles, setProfiles] = useState([]);
  const [articles, setArticles] = useState([]);
  const [events, setEvents] = useState([]);
  const [sites, setSites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        const [profilesRes, articlesRes, eventsRes, sitesRes] = await Promise.allSettled([
          allProfiles(),
          instanceApi.get("/articles/"),
          instanceApi.get("/evenements/"),
          instanceApi.get("/sites/"),
        ]);

        if (profilesRes.status === "fulfilled" && profilesRes.value?.success) {
          setProfiles(profilesRes.value.data || []);
        }

        if (articlesRes.status === "fulfilled" && Array.isArray(articlesRes.value?.data)) {
          setArticles(articlesRes.value.data);
        }

        if (eventsRes.status === "fulfilled" && Array.isArray(eventsRes.value?.data)) {
          setEvents(eventsRes.value.data);
        }

        if (sitesRes.status === "fulfilled" && Array.isArray(sitesRes.value?.data)) {
          setSites(sitesRes.value.data);
        }
      } catch (error) {
        console.error("Erreur lors du chargement des données du tableau de bord:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="flex flex-col w-full min-h-full pb-10">
      <HeaderAdmin />

      <div className="flex flex-col justify-start items-start space-y-1 px-6 py-6">
        <h2 className="text-2xl font-bold text-slate-900">Tableau de bord</h2>
        <p className="text-base text-slate-600">
          Vue d'ensemble des données de la plateforme
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-6">
        <Card
          icon={<Users className="text-blue-600 w-5 h-5" />}
          title={"Inscrits"}
          stats={loading ? "..." : profiles.length}
          desc={"Utilisateurs inscrits"}
        />
        <Card
          icon={<Building2 className="text-emerald-600 w-5 h-5" />}
          title={"Sites"}
          stats={loading ? "..." : sites.length}
          desc={"Sites Olympiques"}
        />
        <Card
          icon={<Newspaper className="text-purple-600 w-5 h-5" />}
          title={"Articles"}
          stats={loading ? "..." : articles.length}
          desc={"Articles publiés"}
        />
        <Card
          icon={<Calendar className="text-amber-600 w-5 h-5" />}
          title={"Événements"}
          stats={loading ? "..." : events.length}
          desc={"Événements programmés"}
        />
      </div>

      <div className="py-6 px-6">
        <EvolutionInscriptions profiles={profiles} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-6">
        <RecentArticles articles={articles} />
        <RecentActivities profiles={profiles} articles={articles} events={events} />
      </div>
    </div>
  );
};

export default DashboardAdmin;

