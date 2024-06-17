import { Api } from "../utils/BaseUrlServer";
import { getToken } from "../utils/Token";
const API = Api();
export const updateUser = (userId, dataUpdate) => {
  const token = getToken();
  return API.patch(`/update-profile-user/${userId}`, dataUpdate, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
