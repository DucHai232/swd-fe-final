import { Api } from "../utils/BaseUrlServer";
import { getToken } from "../utils/Token";
const API = Api();

export const createPackageInPeriod = (data) => {
  const token = getToken();
  return API.post("/create-packageinperiod", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getPackageInPeriodByPackageOrderId = (packageOrderId) => {
  const token = getToken();
  return API.get(`/get-packageinperiod-by-packageOrder/${packageOrderId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getAllPackageInPeriods = () => {
  const token = getToken();
  return API.get("/get-all-packageinperiod", {
    headers: { Authorization: `Bearer ${token}` },
  });
};
