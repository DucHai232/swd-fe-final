import { Api } from "../utils/BaseUrlServer";
import { getToken } from "../utils/Token";
const API = Api();
export const getProduct = (
  boxIdQuery,
  themeIdQuery,
  originQuery,
  colorQuery,
  fromPrice,
  toPrice,
  search,
  status
) => {
  return API.get(
    `/get-product?search=${search}&status=${status}&fromPrice=${fromPrice}&toPrice=${toPrice}
    &colorQuery=${colorQuery}&originQuery=${originQuery}&boxIdQuery=${boxIdQuery}&themeIdQuery=${themeIdQuery}`
  );
};

export const getProductById = (productId) => {
  return API.get(`/get-productById/${productId}`);
};

export const deleteProductById = (productId) => {
  return API.delete(`/delete-productById/${productId}`);
};

export const createProduct = (data) => {
  const token = getToken();
  return API.post("/create-product", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const randomProduct = (packageId, kidId) => {
  return API.get(`/random-product/${kidId}/${packageId}`);
};

export const updateProduct = (productId, data) => {
  const token = getToken();
  return API.put(`/update-product/${productId}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
