import api from "@/services/api";

export async function getBookings(params = {}) {
  const { data } = await api.get("/bookings", { params });
  return data;
}

export async function createOrUpdateBooking(payload) {
  const { data } = await api.post("/bookings", payload);
  return data;
}
