import api from "@/services/api";

// export async function login({ email, password }) {
//   const { data } = await api.post("/auth/login", { email, password });
//   if (typeof window !== "undefined" && data.token) {
//     window.localStorage.setItem("assetflow_token", data.token);
//   }
//   return data.user;
// }

export async function login({ email, password, role }) {
  // TEMP: no backend yet — mock a successful login so the UI is browsable.
  // Replace this with the real api.post("/auth/login", ...) call once the
  // Node/Express API is running.
  const user = { name: email.split("@")[0] || "Demo user", email, role: role || "Employee" };
  if (typeof window !== "undefined") {
    window.localStorage.setItem("assetflow_token", "demo-token");
  }
  return user;
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
    window.localStorage.removeItem("assetflow_token");
  }
}
