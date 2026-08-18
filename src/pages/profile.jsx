import { useEffect, useMemo, useState } from "react";
import Icon from "../composants/Icon";
import Header from "../composants/header";
import Footer from "../composants/footer";
import { billetApi, evenementApi, favorisApi, userApi } from "../services/api";

const CalendarDays = (props) => <Icon name="CalendarDays" {...props} />;
const Check = (props) => <Icon name="Check" {...props} />;
const ChevronRight = (props) => <Icon name="ChevronRight" {...props} />;
const Edit3 = (props) => <Icon name="Pencil" {...props} />;
const Globe2 = (props) => <Icon name="Globe2" {...props} />;
const Heart = (props) => <Icon name="Heart" {...props} />;
const LockKeyhole = (props) => <Icon name="LockKeyhole" {...props} />;
const Mail = (props) => <Icon name="Mail" {...props} />;
const MapPin = (props) => <Icon name="MapPin" {...props} />;
const Plus = (props) => <Icon name="Plus" {...props} />;
const ShieldCheck = (props) => <Icon name="ShieldCheck" {...props} />;
const Ticket = (props) => <Icon name="Ticket" {...props} />;
const UserRound = (props) => <Icon name="UserRound" {...props} />;
const Bell = (props) => <Icon name="Bell" {...props} />;
const XCircle = (props) => <Icon name="CircleX" {...props} />;

const formatDate = (value) => {
  if (!value) return "Date non disponible";
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
};

const formatRelative = (value) => {
  if (!value) return "";
  const date = new Date(value);
  const diff = Math.max(0, Date.now() - date.getTime());
  const days = Math.floor(diff / 86400000);

  if (days === 0) return "Aujourd'hui";
  if (days === 1) return "Il y a 1 jour";
  if (days < 7) return `Il y a ${days} jours`;
  const weeks = Math.floor(days / 7);
  if (weeks === 1) return "Il y a 1 semaine";
  return `Il y a ${weeks} semaines`;
};

const initials = (user) =>
  `${user?.first_name?.[0] || ""}${user?.last_name?.[0] || ""}`.toUpperCase() || "U";

const statusLabel = (status) => {
  const labels = {
    VALIDE: "Valide",
    UTILISE: "Utilisé",
    ANNULE: "Annulé",
  };
  return labels[status] || status || "Inconnu";
};

const typeLabel = (type) => {
  const labels = {
    VIP: "VIP PASS",
    STANDARD: "STANDARD",
    PRESSE: "PRESSE",
  };
  return labels[type] || type || "STANDARD";
};

function SectionTitle({ icon: Icon, children, action }) {
  return (
    <div className="flex items-center justify-between border-b border-slate-100 pb-5">
      <div className="flex items-center gap-3">
        <Icon className="h-5 w-5 text-sky-600" strokeWidth={2.2} />
        <h2 className="font-olympic-medium text-lg text-slate-900">{children}</h2>
      </div>
      {action}
    </div>
  );
}

function TicketCard({ ticket, event }) {
  const title = ticket.evenement_titre || event?.titre || "Événement";
  const venue = event?.infrastructure?.nom || "Lieu non renseigné";
  const date = event?.date_debut || ticket.date_creation;

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <span className="rounded-md bg-slate-100 px-2.5 py-1 text-[10px] font-bold tracking-wide text-slate-700">
          {typeLabel(ticket.type_billet)}
        </span>
        <div className="rounded-xl border border-slate-200 p-2 text-slate-700">
          <Ticket className="h-5 w-5" />
        </div>
      </div>
      <h3 className="mt-4 max-w-[190px] font-olympic-medium text-base leading-5 text-slate-950">
        {title}
      </h3>
      <p className="mt-1 text-xs text-slate-500">{venue}</p>
      <div className="mt-5 flex items-center justify-between border-t border-dashed border-slate-200 pt-3">
        <span className="flex items-center gap-1.5 text-[11px] text-slate-500">
          <CalendarDays className="h-3.5 w-3.5" />
          {formatDate(date)}
        </span>
        <span
          className={`text-[11px] font-semibold ${
            ticket.statut === "VALIDE" ? "text-sky-600" : "text-slate-500"
          }`}
        >
          {statusLabel(ticket.statut)}
        </span>
      </div>
    </article>
  );
}

function ActivityRow({ icon: Icon, title, description, date, positive = false }) {
  return (
    <div className="flex items-center gap-4 py-3">
      <div
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
          positive ? "bg-emerald-50 text-emerald-500" : "bg-sky-50 text-sky-600"
        }`}
      >
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-olympic-medium text-sm text-slate-900">{title}</p>
        <p className="truncate text-xs text-slate-500">{description}</p>
      </div>
      <span className="shrink-0 text-[9px] uppercase tracking-wide text-slate-400">
        {formatRelative(date)}
      </span>
    </div>
  );
}

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [events, setEvents] = useState({});
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ first_name: "", last_name: "" });
  const [notifications, setNotifications] = useState(
    localStorage.getItem("profile_email_notifications") !== "false",
  );
  const [localActivity, setLocalActivity] = useState(null);

  const loadProfile = async () => {
    setLoading(true);
    setError("");

    try {
      const profileResponse = await userApi.getProfile();
      const user = profileResponse.data;
      setProfile(user);
      setForm({ first_name: user.first_name || "", last_name: user.last_name || "" });

      const [ticketResponse, favoriteResponse] = await Promise.all([
        billetApi.getByUser(user.id),
        favorisApi.getMine(),
      ]);

      const ticketList = Array.isArray(ticketResponse.data)
        ? ticketResponse.data
        : ticketResponse.data?.results || [];
      const favoriteList = Array.isArray(favoriteResponse.data)
        ? favoriteResponse.data
        : favoriteResponse.data?.results || [];

      setTickets(ticketList);
      setFavorites(favoriteList);

      const eventIds = [
        ...new Set(
          [...ticketList, ...favoriteList]
            .map((item) => item.evenement || item.evenement_id)
            .filter(Boolean),
        ),
      ];

      const eventEntries = await Promise.all(
        eventIds.map(async (eventId) => {
          try {
            const response = await evenementApi.getById(eventId);
            return [eventId, response.data];
          } catch {
            return [eventId, null];
          }
        }),
      );

      setEvents(Object.fromEntries(eventEntries));
    } catch (requestError) {
      const status = requestError?.response?.status;
      setError(
        status === 401
          ? "Votre session a expiré. Connectez-vous pour consulter votre profil."
          : "Impossible de charger votre profil. Vérifiez que l'API Django est démarrée.",
      );
    } finally {
      setLoading(false);
    }
  };

  // Le chargement initial synchronise l'interface avec l'API protégée par JWT.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadProfile();
  }, []);

  const activeTickets = useMemo(
    () => tickets.filter((ticket) => ticket.statut === "VALIDE").slice(0, 2),
    [tickets],
  );

  const favoriteEvents = useMemo(
    () =>
      favorites
        .map((favorite) => ({ favorite, event: events[favorite.evenement] }))
        .filter(({ event }) => event),
    [favorites, events],
  );

  const favoriteDisciplines = useMemo(() => {
    const unique = new Map();
    favoriteEvents.forEach(({ event }) => {
      if (event?.discipline?.id) unique.set(event.discipline.id, event.discipline);
    });
    return [...unique.values()].slice(0, 4);
  }, [favoriteEvents]);

  const recentActivities = useMemo(() => {
    const activities = [];
    if (tickets[0]) {
      activities.push({
        icon: Check,
        title: "Achat de billet confirmé",
        description: tickets[0].evenement_titre || "Votre billet a bien été enregistré.",
        date: tickets[0].date_creation,
        positive: true,
      });
    }
    if (localActivity) activities.push(localActivity);
    if (!activities.length && profile?.created_at) {
      activities.push({
        icon: UserRound,
        title: "Compte créé",
        description: "Votre compte JOJ EVENT est prêt.",
        date: profile.created_at,
      });
    }
    return activities.slice(0, 3);
  }, [tickets, profile, localActivity]);

  const saveProfile = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");
    try {
      const response = await userApi.updateProfile(form);
      const updatedUser = response.data?.user || response.data;
      setProfile(updatedUser);
      setEditing(false);
      setLocalActivity({
        icon: Edit3,
        title: "Mise à jour du profil",
        description: "Vos informations personnelles ont été modifiées.",
        date: new Date().toISOString(),
      });
    } catch (requestError) {
      setError(requestError?.response?.data?.detail || "Impossible de modifier le profil.");
    } finally {
      setSaving(false);
    }
  };

  const toggleNotifications = () => {
    const next = !notifications;
    setNotifications(next);
    localStorage.setItem("profile_email_notifications", String(next));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 font-olympic text-slate-900">
        <Header />
        <main className="mx-auto max-w-[1000px] px-5 py-8">
          <div className="animate-pulse space-y-5">
            <div className="h-32 rounded-2xl bg-white" />
            <div className="grid gap-5 lg:grid-cols-[2fr_1fr]">
              <div className="h-64 rounded-2xl bg-white" />
              <div className="h-64 rounded-2xl bg-white" />
            </div>
            <div className="h-60 rounded-2xl bg-white" />
          </div>
        </main>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-slate-50 font-olympic text-slate-900">
        <Header />
        <main className="mx-auto max-w-[1000px] px-5 py-16">
          <div className="rounded-2xl border border-red-100 bg-white p-8 text-center">
            <XCircle className="mx-auto h-10 w-10 text-red-500" />
            <h1 className="mt-4 font-olympic-medium text-xl">Profil indisponible</h1>
            <p className="mt-2 text-sm text-slate-500">{error}</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f5f7] font-olympic text-slate-900">
      <Header />

      <main className="mx-auto max-w-[1000px] px-5 py-5 md:px-6 md:py-8">
        {error && (
          <div className="mb-5 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <section className="rounded-2xl bg-white px-6 py-6 shadow-sm md:px-7">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-5">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-slate-100 ring-4 ring-slate-50">
                <span className="font-olympic-medium text-2xl text-sky-700">{initials(profile)}</span>
              </div>
              <div>
                <h1 className="font-olympic-medium text-2xl text-[#002b52] md:text-[27px]">
                  Bonjour {profile.first_name || ""} !
                </h1>
                <p className="mt-1 text-sm text-slate-900">
                  {profile.first_name} {profile.last_name}
                </p>
                <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
                  <Mail className="h-3.5 w-3.5" /> {profile.email}
                </p>
              </div>
            </div>
            <button
              onClick={() => setEditing((value) => !value)}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-sky-600 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-sky-600/20 transition hover:bg-sky-700"
            >
              <Edit3 className="h-4 w-4" />
              {editing ? "Fermer" : "Modifier profil"}
            </button>
          </div>

          {editing && (
            <form onSubmit={saveProfile} className="mt-6 grid gap-4 border-t border-slate-100 pt-5 sm:grid-cols-2">
              <label className="text-sm font-medium text-slate-700">
                Prénom
                <input
                  value={form.first_name}
                  onChange={(e) => setForm({ ...form, first_name: e.target.value })}
                  className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2.5 outline-none focus:border-sky-500"
                />
              </label>
              <label className="text-sm font-medium text-slate-700">
                Nom
                <input
                  value={form.last_name}
                  onChange={(e) => setForm({ ...form, last_name: e.target.value })}
                  className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2.5 outline-none focus:border-sky-500"
                />
              </label>
              <div className="sm:col-span-2 flex justify-end">
                <button
                  disabled={saving}
                  className="rounded-lg bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
                >
                  {saving ? "Enregistrement..." : "Enregistrer"}
                </button>
              </div>
            </form>
          )}
        </section>

        <div className="mt-5 grid gap-5 lg:grid-cols-[2fr_1fr]">
          <section className="rounded-2xl bg-white p-6 shadow-sm">
            <SectionTitle
              icon={UserRound}
              action={
                <button
                  onClick={() => setEditing(true)}
                  className="text-xs text-slate-500 hover:text-sky-600"
                >
                  Éditer
                </button>
              }
            >
              Informations Personnelles
            </SectionTitle>

            <div className="grid gap-x-10 gap-y-7 pt-6 sm:grid-cols-2">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Prénom</p>
                <p className="mt-1.5 text-sm font-semibold">{profile.first_name || "—"}</p>
              </div>
              <div>
                <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Nom</p>
                <p className="mt-1.5 text-sm font-semibold">{profile.last_name || "—"}</p>
              </div>
              <div>
                <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Email</p>
                <p className="mt-1.5 break-all text-sm font-semibold">{profile.email}</p>
              </div>
              <div>
                <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Rôle</p>
                <p className="mt-1.5 text-sm font-semibold">{profile.role || "Spectateur"}</p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Pays</p>
                <span className="mt-2 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-slate-700">
                  <MapPin className="h-3.5 w-3.5 text-sky-600" /> Non renseigné
                </span>
              </div>
            </div>
          </section>

          <section className="rounded-2xl bg-white p-6 shadow-sm">
            <SectionTitle icon={ShieldCheck}>Sécurité & Préférences</SectionTitle>

            <p className="mt-6 text-[9px] font-bold uppercase tracking-wider text-slate-400">Sécurité</p>
            <button className="mt-3 flex w-full items-center gap-3 rounded-xl border border-slate-100 p-3 text-left transition hover:border-slate-200">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-50">
                <LockKeyhole className="h-4 w-4 text-slate-700" />
              </span>
              <span className="flex-1">
                <span className="block text-xs font-semibold">Mot de passe</span>
                <span className="block text-[9px] text-slate-400">Modifier votre mot de passe</span>
              </span>
              <ChevronRight className="h-4 w-4 text-slate-400" />
            </button>

            <p className="mt-7 text-[9px] font-bold uppercase tracking-wider text-slate-400">Préférences</p>
            <button
              onClick={toggleNotifications}
              className="mt-3 flex w-full items-center gap-3 rounded-xl border border-slate-100 p-3 text-left"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-50">
                <Bell className="h-4 w-4 text-slate-700" />
              </span>
              <span className="flex-1 text-xs font-semibold">Notifications Email</span>
              <span className={`relative h-4 w-7 rounded-full ${notifications ? "bg-sky-600" : "bg-slate-300"}`}>
                <span className={`absolute top-0.5 h-3 w-3 rounded-full bg-white transition ${notifications ? "right-0.5" : "left-0.5"}`} />
              </span>
            </button>
            <div className="mt-3 flex items-center gap-3 rounded-xl border border-slate-100 p-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-50">
                <Globe2 className="h-4 w-4 text-slate-700" />
              </span>
              <span className="flex-1">
                <span className="block text-xs font-semibold">Langue</span>
                <span className="block text-[9px] text-slate-400">Français (FR)</span>
              </span>
              <ChevronRight className="h-4 w-4 text-slate-400" />
            </div>

            <button className="mt-7 flex items-center gap-2 text-xs font-semibold text-red-500 hover:text-red-600">
              <XCircle className="h-4 w-4" />
              Déconnexion de tous les appareils
            </button>
          </section>
        </div>

        <section className="mt-5 rounded-2xl bg-white p-6 shadow-sm">
          <SectionTitle
            icon={Ticket}
            action={
              <button className="text-xs font-semibold text-sky-600 hover:text-sky-700">
                Voir tout →
              </button>
            }
          >
            Billets Actifs
          </SectionTitle>

          {activeTickets.length ? (
            <div className="grid gap-4 pt-5 sm:grid-cols-2">
              {activeTickets.map((ticket) => (
                <TicketCard
                  key={ticket.id}
                  ticket={ticket}
                  event={events[ticket.evenement]}
                />
              ))}
            </div>
          ) : (
            <div className="py-10 text-center text-sm text-slate-500">
              Vous n'avez aucun billet actif pour le moment.
            </div>
          )}
        </section>

        <section className="mt-5 rounded-2xl bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 pb-5">
            <div className="flex items-center gap-3">
              <Heart className="h-5 w-5 text-sky-600" />
              <h2 className="font-olympic-medium text-lg text-slate-900">Sports Favoris & Événements</h2>
            </div>
            <button className="rounded-lg border border-slate-200 px-3 py-2 text-[10px] font-semibold text-slate-700">
              Voir calendrier
            </button>
          </div>

          <div className="flex flex-wrap gap-2 pt-5">
            {favoriteDisciplines.map((discipline) => (
              <span key={discipline.id} className="rounded-full border border-sky-100 bg-sky-50 px-3 py-1.5 text-[10px] font-semibold text-sky-800">
                {discipline.nom}
              </span>
            ))}
            <button className="inline-flex items-center gap-1 rounded-full border border-dashed border-slate-300 px-3 py-1.5 text-[10px] font-semibold text-slate-600 hover:border-sky-400 hover:text-sky-600">
              <Plus className="h-3 w-3" /> Ajouter
            </button>
          </div>

          {favoriteEvents.length > 0 && (
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {favoriteEvents.slice(0, 4).map(({ favorite, event }) => (
                <div key={favorite.id} className="flex items-center gap-3 rounded-xl border border-slate-100 p-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-50">
                    <Heart className="h-4 w-4 fill-sky-500 text-sky-500" />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-xs font-semibold">{event.titre}</p>
                    <p className="text-[10px] text-slate-500">
                      {event.discipline?.nom || "Discipline"} · {formatDate(event.date_debut)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-6 border-t border-slate-100 pt-5">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">Activité récente</p>
            {recentActivities.length ? (
              recentActivities.map((activity, index) => (
                <ActivityRow key={`${activity.title}-${index}`} {...activity} />
              ))
            ) : (
              <p className="py-4 text-sm text-slate-500">Aucune activité récente.</p>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ProfilePage;
