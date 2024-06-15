import { Api } from "../utils/BaseUrlServer";
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
