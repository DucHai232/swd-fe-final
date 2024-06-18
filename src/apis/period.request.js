import { Api } from "../utils/BaseUrlServer";
const API = Api();

export const getCurrentPeriod = () => {
  return API.get("/get-current-period");
};
