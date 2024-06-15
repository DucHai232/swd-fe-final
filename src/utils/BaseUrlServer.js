import axios from "axios";

export const Api = () => {
  return axios.create({
    baseURL: "https://mysterybox-swd-be.onrender.com/api/v1",
  });
};
