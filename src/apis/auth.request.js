import { Api } from "../utils/BaseUrlServer";
const API = Api();
export const login = (data) => {
  return API.post("/login", data);
};

export const register = (data) => {
  return API.post("/register", data);
};
