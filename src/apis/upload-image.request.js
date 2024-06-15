import axios from "axios";
export const uploadImage = (imageData) => {
  return axios.post(
    "https://mysterybox-swd-be.onrender.com/upload-image",
    imageData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

export const uploadImages = (imageData) => {
  return axios.post(
    "https://mysterybox-swd-be.onrender.com/upload-images",
    imageData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};
