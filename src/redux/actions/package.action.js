import * as PackageApi from "../../apis/package.request";
import actionsType from "./action.types";
export const getDataPackage = (search, status) => async (dispatch) => {
  dispatch({ type: actionsType.PACKAGE_START });
  try {
    const response = await PackageApi.getPackage(search, status); //data
    dispatch({ type: actionsType.GET_PACKAGE_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: actionsType.PACKAGE_FAIL,
      payload: error.response.data.message,
    });
  }
};
