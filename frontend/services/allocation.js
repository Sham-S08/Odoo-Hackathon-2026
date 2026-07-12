import api from "@/services/api";

export async function getAllocations(params = {}) {
  const { data } = await api.get("/allocations", { params });
  return data;
}

export async function allocateOrReturnAsset(payload) {
  const { data } = await api.post("/allocations", payload);
  return data;
}

export async function getTransferRequests(params = {}) {
  const { data } = await api.get("/transfers", { params });
  return data;
}

export async function createOrApproveTransfer(payload) {
  const { data } = await api.post("/transfers", payload);
  return data;
}
