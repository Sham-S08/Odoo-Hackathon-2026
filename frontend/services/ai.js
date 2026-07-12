import api from "@/services/api";

export async function getMaintenanceInsight(payload) {
  try {
    const { data } = await api.post("/ai/maintenance-insights", payload);
    return data;
  } catch (err) {
    return null;
  }
}
