import { Api } from "../utils/BaseUrlServer";
import { getToken } from "../utils/Token";
const API = Api();

export const revenueWeek = () => {
  const token = getToken();
  return API.get("/revenue-week", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const revenueMonth = (month) => {
  const token = getToken();
  return API.get(`/revenue-month/${month}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const revenueDate = (data) => {
  const token = getToken();
  return API.post("/revenue-date", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
