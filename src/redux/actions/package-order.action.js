import * as PackageOrderApi from "../../apis/package-order.request";
import actionsType from "./action.types";
export const orderPackage = (packageId, orderData) => async (dispatch) => {
  dispatch({ type: actionsType.PACKAGE_ORDER_START });
  try {
    const response = await PackageOrderApi.orderPackage(packageId, orderData);
    dispatch({
      type: actionsType.PACKAGE_ORDER_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: actionsType.PACKAGE_ORDER_FAIL,
      payload: "",
    });
  }
};

export const getPackageOrderByUserId = () => async (dispatch) => {
  dispatch({ type: actionsType.PACKAGE_ORDER_START });
  try {
    const response = await PackageOrderApi.getPackageOrderByUserId();
    dispatch({
      type: actionsType.GET_PACKAGE_ORDER_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: actionsType.PACKAGE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};
