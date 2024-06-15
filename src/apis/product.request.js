import { Api } from "../utils/BaseUrlServer";
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
  return API.post("/create-product", data);
};
