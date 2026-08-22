import React, { useState } from "react";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { instanceApi } from "../../services/api";
import { toast } from "react-toastify";

export default function UserForm({ initialData = null, onCancel, onSuccess }) {
  const isEditing = Boolean(initialData?.id);

  const [formData, setFormData] = useState({
    first_name: initialData?.first_name || "",
    last_name: initialData?.last_name || "",
    email: initialData?.email || "",
    role: initialData?.role || "SPECTATEUR",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.first_name.trim()) {
      toast.error("Le prénom est obligatoire");
      return;
    }
    if (!formData.last_name.trim()) {
      toast.error("Le nom de famille est obligatoire");
      return;
    }
    if (!formData.email.trim()) {
      toast.error("L'adresse email est obligatoire");
      return;
    }
    if (!isEditing && !formData.password) {
      toast.error("Le mot de passe est obligatoire pour créer un compte");
      return;
    }

    setSubmitting(true);

    try {
      const payload = {
        email: formData.email.trim(),
        first_name: formData.first_name.trim(),
        last_name: formData.last_name.trim(),
        role: formData.role,
        is_verified: formData.statut === "ACTIF",
      };

      if (isEditing) {
        payload.id = initialData.id;
      }

      if (formData.password) {
        payload.password = formData.password;
        payload.password_confirm = formData.password;
      }

      if (isEditing) {
        await instanceApi.patch("/user/profile/update/", payload);
        toast.success("Utilisateur mis à jour avec succès");
      } else {
        await instanceApi.post("/auth/register/", payload);
        toast.success("Utilisateur créé avec succès");
      }

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      const errData = error.response?.data;
      const message =
        errData?.detail ||
        errData?.error ||
        errData?.email?.[0] ||
        errData?.first_name?.[0] ||
        errData?.last_name?.[0] ||
        errData?.message ||
        error.message ||
        "Erreur lors de l'enregistrement de l'utilisateur";
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-white rounded-2xl p-6 sm:p-8 shadow-[0px_1px_3px_rgba(0,0,0,0.04)] border border-gray-100/80">
      <div className="flex items-center gap-3 mb-6">
        <button
          type="button"
          onClick={onCancel}
          className="p-2 rounded-full hover:bg-gray-100 transition text-gray-600"
          title="Retour"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            {isEditing ? "Modifier l'utilisateur" : "Ajouter un utilisateur"}
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Créez un nouveau compte d'accès conforme à la plateforme Dakar 2026.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Prénom <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              placeholder="Ex: Jean-Paul"
              className="w-full px-3.5 py-2.5 bg-gray-50/50 rounded-lg border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Nom <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              placeholder="Ex: Mbow"
              className="w-full px-3.5 py-2.5 bg-gray-50/50 rounded-lg border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Email <span className="text-rose-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Ex: jp.mbow@dakar2026.sn"
              className="w-full px-3.5 py-2.5 bg-gray-50/50 rounded-lg border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Rôle <span className="text-rose-500">*</span>
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 bg-gray-50/50 rounded-lg border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
              required
            >
              <option value="SPECTATEUR">Spectateur (Standard)</option>
              <option value="JOURNALISTE">Journaliste (Presse)</option>
              <option value="ADMIN">Administrateur</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Mot de passe {!isEditing && <span className="text-rose-500">*</span>}
            </label>
            <div className="relative max-w-md">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder={isEditing ? "Laisser vide pour ne pas modifier" : "••••••••••••"}
                className="w-full px-3.5 py-2.5 bg-gray-50/50 rounded-lg border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition pr-10"
                required={!isEditing}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-end items-center gap-3 pt-4 border-t border-gray-100">
          <button
            type="button"
            onClick={onCancel}
            disabled={submitting}
            className="px-5 py-2.5 rounded-lg border border-gray-300 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition"
          >
            Annuler
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-sm font-semibold text-white transition shadow-sm flex items-center gap-2"
          >
            {submitting
              ? "Enregistrement..."
              : isEditing
              ? "Enregistrer les modifications"
              : "+ Créer l'utilisateur"}
          </button>
        </div>
      </form>
    </div>
  );
}
