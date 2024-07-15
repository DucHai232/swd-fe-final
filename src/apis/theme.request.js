import { Api } from "../utils/BaseUrlServer";
const API = Api();
export const getThemes = (search, status) => {
  return API.get(`/get-themes?search=${search}&status=${status}`);
};

export const createTheme = (data) => {
  return API.post("/create-theme", data);
};

export const deleteTheme = (themeId, status) => {
  return API.patch(`/delete-theme/${themeId}`, status);
};

export const updateTheme = (themeId, data) => {
  return API.put(`/update-theme/${themeId}`, data);
};
