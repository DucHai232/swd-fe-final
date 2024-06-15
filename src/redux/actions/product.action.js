import * as ProductApi from "../../apis/product.request";
import actionsType from "./action.types";
export const getProducts =
  (
    boxIdQuery,
    themeIdQuery,
    originQuery,
    colorQuery,
    fromPrice,
    toPrice,
    search,
    status
  ) =>
  async (dispatch) => {
    dispatch({ type: actionsType.PRODUCT_START });
    try {
      const response = await ProductApi.getProduct(
        boxIdQuery,
        themeIdQuery,
        originQuery,
        colorQuery,
        fromPrice,
        toPrice,
        search,
        status
      );
      dispatch({
        type: actionsType.GET_PRODUCT_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({ type: actionsType.PRODUCT_FAIL, payload: "error" });
    }
  };

export const deleteProduct = (productId) => async (dispatch) => {
  dispatch({ type: actionsType.PRODUCT_START });
  try {
    const response = await ProductApi.deleteProductById(productId);
    dispatch({
      type: actionsType.PRODUCT_DELETE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: actionsType.PRODUCT_FAIL,
      payload: "error",
    });
  }
};

export const createProduct = (data) => async (dispatch) => {
  dispatch({ type: actionsType.PRODUCT_START });
  try {
    const response = await ProductApi.createProduct(data);
    dispatch({
      type: actionsType.PRODUCT_CREATE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: actionsType.PRODUCT_FAIL,
      payload: "error",
    });
  }
};
