import { Api } from "../utils/BaseUrlServer";
import { getToken } from "../utils/Token";
const API = Api();
export const getPackage = (search, status) => {
  return API.get(`/get-package?search=${search}&status=${status}`);
};

export const deleteSoftPackage = (packageId) => {
  return API.patch(`/delete-soft-package/${packageId}`, { status: false });
};

export const createPackage = (data) => {
  return API.post("/create-package", data);
};

export const updatePackage = (packageId, data) => {
  const token = getToken();
  return API.patch(`/update-package/${packageId}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
