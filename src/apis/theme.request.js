import { Api } from "../utils/BaseUrlServer";
import { getToken } from "../utils/Token";
const API = Api();
export const getThemes = (search, status) => {
  return API.get(`/get-themes?search=${search}&status=${status}`);
};

export const createTheme = (data) => {
  const token = getToken();
  return API.post("/create-theme", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteTheme = (themeId, status) => {
  const token = getToken();
  return API.patch(`/delete-theme/${themeId}`, status, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateTheme = (themeId, data) => {
  const token = getToken();
  return API.put(`/update-theme/${themeId}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
