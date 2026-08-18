import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api/";

export const instanceApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const instance = instanceApi;

const getAccessToken = () => {
  const directToken = localStorage.getItem("accessToken") || localStorage.getItem("access_token");
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

export default instanceApi;
