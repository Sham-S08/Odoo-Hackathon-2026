import api from "@/services/api";

export async function getMaintenanceRequests(params = {}) {
  const { data } = await api.get("/maintenance", { params });
  return data;
}

export async function raiseOrUpdateMaintenanceRequest(payload) {
  const { data } = await api.post("/maintenance", payload);
  return data;
}
