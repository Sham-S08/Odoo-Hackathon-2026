import api from "@/services/api";

export async function getAssets(params = {}) {
  const { data } = await api.get("/assets", { params });
  return data;
}

export async function registerAsset(payload) {
  const { data } = await api.post("/assets", payload);
  return data;
}

export async function getAssetById(id) {
  const { data } = await api.get(`/assets/${id}`);
  return data;
}

export async function updateAsset(id, payload) {
  const { data } = await api.put(`/assets/${id}`, payload);
  return data;
}

export async function deleteAsset(id) {
  const { data } = await api.delete(`/assets/${id}`);
  return data;
}