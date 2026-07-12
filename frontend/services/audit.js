import api from "@/services/api";

export async function getAuditCycles(params = {}) {
  const { data } = await api.get("/audits", { params });
  return data;
}

export async function createOrUpdateAuditCycle(payload) {
  const { data } = await api.post("/audits", payload);
  return data;
}
