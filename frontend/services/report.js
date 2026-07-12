import api from "@/services/api";

export async function generateReport(params = {}) {
  const { data } = await api.get("/reports", { params });
  return data;
}
