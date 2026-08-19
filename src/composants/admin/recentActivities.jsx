import React, { useState, useEffect, useMemo } from "react";
import { Users, FileText, Calendar, Activity } from "lucide-react";
import { formatRelativeTime } from "../../utils/formatDate";
import { ACTIVITY_CONFIG } from "../../constants/articles";



export default function RecentActivities({ profiles = [], articles = [], events = [] }) {
  const [, setTick] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTick((prev) => prev + 1);
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const activities = useMemo(() => {
    const combined = [];

    if (Array.isArray(profiles)) {
      profiles.forEach((user) => {
        if (user?.created_at) {
          const fullName =
            user.first_name && user.last_name
              ? `${user.first_name} ${user.last_name}`
              : user.email?.split("@")[0] || "Un utilisateur";
          const roleLabel = (user.role || "spectateur").toLowerCase();

          combined.push({
            id: `user-${user.id}`,
            type: "USER_REGISTERED",
            title: "Nouvel utilisateur inscrit",
            description: `${fullName} a créé un compte ${roleLabel}`,
            date: user.created_at,
          });
        }
      });
    }

    if (Array.isArray(articles)) {
      articles.forEach((art) => {
        if (art?.created_at || art?.published_at) {
          const author = art.auteur || art.author_name || "La rédaction";
          combined.push({
            id: `art-${art.id}`,
            type: "ARTICLE_PUBLISHED",
            title: "Article publié",
            description: `${author} a publié "${art.titre}"`,
            date: art.published_at || art.created_at,
          });
        }
      });
    }

    if (Array.isArray(events)) {
      events.forEach((ev) => {
        if (ev?.created_at) {
          combined.push({
            id: `ev-${ev.id}`,
            type: "EVENT_CREATED",
            title: "Événement créé",
            description: `${ev.titre} ajouté au programme`,
            date: ev.created_at,
          });
        }
      });
    }

    combined.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return combined.slice(0, 5);
  }, [profiles, articles, events]);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-[0px_1px_3px_rgba(0,0,0,0.04)] border border-gray-100/80 flex flex-col h-full min-h-[300px]">
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-base font-bold text-gray-900 tracking-tight">
          Activité récente
        </h3>
      </div>

      {activities.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center py-10 text-center">
          <p className="text-sm text-gray-400 font-normal">
            Aucune activité récente pour le moment.
          </p>
        </div>
      ) : (
        <div className="divide-y divide-gray-100 flex-1">
          {activities.map((act) => {
            const config = ACTIVITY_CONFIG[act.type] || ACTIVITY_CONFIG.DEFAULT;
            const Icon = config.icon;
            const relativeTime = formatRelativeTime(act.date);

            return (
              <div key={act.id} className="py-3.5 first:pt-0 last:pb-0 flex items-start gap-3.5">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${config.bgColor}`}
                >
                  <Icon className={`w-4 h-4 ${config.iconColor}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-gray-900 leading-snug truncate">
                    {act.title}
                  </h4>
                  <p className="text-xs text-gray-500 font-normal leading-tight mt-0.5 truncate">
                    {act.description}
                  </p>
                  <span className="text-[11px] text-gray-400 font-normal mt-1 block">
                    {relativeTime}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
