import api from "@/services/api";

export async function getNotifications(params = {}) {
  const { data } = await api.get("/notifications", { params });
  return data;
}

export async function getActivityLogs(params = {}) {
  const { data } = await api.get("/activity-logs", { params });
  return data;
}
