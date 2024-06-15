import { Api } from "../utils/BaseUrlServer";
const API = Api();

export const getBox = () => {
  return API.get("/get-mysterybox");
};

export const createBox = (data) => {
  return API.post("/create-mysterybox", data);
};
