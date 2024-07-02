import { Api } from "../utils/BaseUrlServer";
const API = Api();

export const getBox = () => {
  return API.get("/get-mysterybox");
};

export const getBoxCondition = (data) => {
  return API.post("/get-mysterybox-condition", data);
};

export const createBox = (data) => {
  return API.post("/create-mysterybox", data);
};
