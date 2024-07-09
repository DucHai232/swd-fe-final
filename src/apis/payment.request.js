import { Api } from "../utils/BaseUrlServer";
const API = Api();
export const createPayment = (body) => {
  return API.post("/create-payment", body);
};

export const orderStatus = (app_trans_id) => {
  return API.post(`/order-status/${app_trans_id}`);
};
