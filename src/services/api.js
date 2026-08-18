import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: "application/json",
  },
});

const getAccessToken = () => {
  const directToken = localStorage.getItem("access_token");
  if (directToken) return directToken;

  const authToken = localStorage.getItem("token");
  if (authToken) return authToken;

  const tokens = localStorage.getItem("tokens");
  if (tokens) {
    try {
      const parsed = JSON.parse(tokens);
      return parsed?.access || parsed?.access_token || null;
    } catch {
      return null;
    }
  }

  return null;
};

api.interceptors.request.use((config) => {
  const token = getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const userApi = {
  getProfile: () => api.get("/user/profile/"),
  updateProfile: (payload) => api.patch("/user/profile/update/", payload),
};

export const billetApi = {
  getByUser: (userId) =>
    api.get("/billets/", { params: { utilisateur: userId } }),
};

export const evenementApi = {
  getById: (id) => api.get(`/evenements/${id}/`),
};

export const favorisApi = {
  getMine: () => api.get("/favoris/"),
  remove: (id) => api.delete(`/favoris/${id}/`),
};

export default api;
