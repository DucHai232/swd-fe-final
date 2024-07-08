import { Api } from "../utils/BaseUrlServer";
const API = Api();
export const createPayment = (body) => {
  return API.post("/create-payment", body);
};
