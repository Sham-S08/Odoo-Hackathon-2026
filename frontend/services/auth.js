import api from "@/services/api";

export async function login({ email, password, role }) {
  const { data } = await api.post("/auth/login", { email, password });
  if (typeof window !== "undefined" && data.token) {
    window.localStorage.setItem(
      process.env.NEXT_PUBLIC_TOKEN_KEY || "assetflow_token",
      data.token
    );
  }
  return data.user;
}

export async function signup({ name, email, password }) {
  const { data } = await api.post("/auth/signup", { name, email, password });
  return data.user;
}

export async function getProfile() {
  const { data } = await api.get("/auth/profile");
  return data.user;
}

export async function logout() {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(process.env.NEXT_PUBLIC_TOKEN_KEY || "assetflow_token");
  }
  // Optional: Call logout API
  // await api.post("/auth/logout");
}