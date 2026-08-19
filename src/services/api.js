import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api/";

// Instance principale Axios
export const instanceApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: "application/json",
  },
});

export const instance = instanceApi;

// Fonction utilitaire pour récupérer le token d'accès
const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};

// Interceptor de requête : Ajoute le token Bearer à chaque requête
instanceApi.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor de réponse : Rafraîchit automatiquement le token si expiré (Code 401)
instanceApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        try {
          const res = await axios.post(`${API_BASE_URL}auth/token/refresh/`, {
            refresh: refreshToken,
          });

          if (res.data.access) {
            localStorage.setItem("accessToken", res.data.access);
            instanceApi.defaults.headers.common["Authorization"] = `Bearer ${res.data.access}`;
            originalRequest.headers["Authorization"] = `Bearer ${res.data.access}`;

            return instanceApi(originalRequest);
          }
        } catch (refreshError) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          window.location.href = "/auth/login";
        }
      }
    }

    return Promise.reject(error);
  }
);

export default instanceApi;

