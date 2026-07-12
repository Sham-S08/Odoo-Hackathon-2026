import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - Add token
api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = window.localStorage.getItem(
        process.env.NEXT_PUBLIC_TOKEN_KEY || "assetflow_token"
      );
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - Handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      if (typeof window !== "undefined") {
        window.localStorage.removeItem(
          process.env.NEXT_PUBLIC_TOKEN_KEY || "assetflow_token"
        );
        // Redirect to login if not already there
        if (!window.location.pathname.includes("/login")) {
          window.location.href = "/login";
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;