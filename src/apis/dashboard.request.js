import { Api } from "../utils/BaseUrlServer";
const API = Api();

export const revenueWeek = () => {
  return API.get("/revenue-week");
};
