import { instance } from "./api";

const PROFILE_ENDPOINT = "user/profile/";

/**
 * Récupère les informations du profil utilisateur connecté
 */
export async function getProfile() {
  const { data } = await instance.get(PROFILE_ENDPOINT);
  return data;
}

/**
 * Met à jour le profil de l'utilisateur connecté
 */
export async function updateProfile(payload) {
  const { data } = await instance.patch(`${PROFILE_ENDPOINT}update/`, payload);
  return data;
}

/**
 * Récupère les billets réservés par un utilisateur
 */
export async function getUserTickets(userId) {
  const { data } = await instance.get("billets/", {
    params: { utilisateur: userId },
  });
  return data;
}

/**
 * Récupère les favoris de l'utilisateur
 */
export async function getUserFavorites() {
  const { data } = await instance.get("favoris/");
  return data;
}

/**
 * Supprime un favori
 */
export async function removeFavorite(id) {
  const { data } = await instance.delete(`favoris/${id}/`);
  return data;
}

// Objets d'export compatibles pour préserver la rétrocompatibilité
export const userApi = {
  getProfile: () => instance.get(PROFILE_ENDPOINT),
  updateProfile: (payload) => instance.patch(`${PROFILE_ENDPOINT}update/`, payload),
};

export const billetApi = {
  getByUser: (userId) => instance.get("billets/", { params: { utilisateur: userId } }),
};

export const favorisApi = {
  getMine: getUserFavorites,
  remove: removeFavorite,
};
