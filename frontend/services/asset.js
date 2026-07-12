import api from "@/services/api";

export async function getAssets(params = {}) {
  const { data } = await api.get("/assets", { params });
  return data;
}

export async function registerAsset(payload) {
  const { data } = await api.post("/assets", payload);
  return data;
}
