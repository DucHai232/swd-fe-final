import { Api } from "../utils/BaseUrlServer";
const API = Api();

export const revenueWeek = () => {
  return API.get("/revenue-week");
};

export const revenueMonth = (month) => {
  return API.get(`/revenue-month/${month}`);
};

export const revenueDate = (data) => {
  return API.post("/revenue-date", data);
};
