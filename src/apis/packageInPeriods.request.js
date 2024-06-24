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

export const chooseProductInPeriods = (productId, packageOrderId) => {
  return API.get(`/add-product-packageinperiod/${productId}/${packageOrderId}`);
};

export const getDataPackagePeriodOfPackageOrder = (packageOrderId) => {
  return API.get(`/get-packageinperiod-of-packageorder/${packageOrderId}`);
};
