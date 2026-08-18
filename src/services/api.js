import axios from "axios";

// Configuration de l'instance Axios principale
export const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/",
  headers: {
    Accept: "application/json",
  },
});

// Configuration pour les requêtes multipart (upload de fichiers)
export const multipartInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/",
  headers: {
    Accept: "application/json",
  },
});

// Intercepteur pour ajouter le token JWT à toutes les requêtes
export const setupAxiosInterceptors = () => {
  instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }, (error) => Promise.reject(error));

  multipartInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }, (error) => Promise.reject(error));
};
