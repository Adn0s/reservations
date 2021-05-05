import http from "../http-common";

export const getAll = () => {
  return http.get("/reservations");
};

export const create = (data: Reservation) => {
  return http.post("/reservations", data);
};

export const remove = (id: number) => {
  return http.delete(`/reservations/${id}`);
};
