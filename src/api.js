import axios from "axios";

// usa variable de entorno (si no existe, fallback a localhost para desarrollo)
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api",
});

// interceptor que añade Authorization con la llave 'access'
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access");

    // no poner Authorization en endpoints públicos
    const isPublic = config.url.includes("/login/") || config.url.includes("/register/") || config.url.includes("/verify");
    if (token && !isPublic) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
