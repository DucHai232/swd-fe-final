import { Api } from "../utils/BaseUrlServer";
import { getToken } from "../utils/Token";
const API = Api();
export const orderPackage = (packageId, orderData) => {
  const token = getToken();
  return API.post(`/add-order-package/${packageId}`, orderData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getPackageOrderByUserId = () => {
  const token = getToken();
  return API.get("/get-packageorderbyuserid", {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getAllOrder = () => {
  const token = getToken();
  return API.get("/get-all-order", {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const addPackInPeriod = (packageOrderId) => {
  return API.get(`/push-product-order/${packageOrderId}`);
};

// export const getPackageOrderByIdPk = (packageOrderId) => {
//   const token = getToken();
//   return API.get(`/get-packageorderbyidpk/${packageOrderId}`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
// };
