import * as AuthApi from "../../apis/auth.request";
import actionsType from "./action.types";
export const login = (data) => async (dispatch) => {
  dispatch({ type: actionsType.AUTH_START });
  try {
    const response = await AuthApi.login(data);
    dispatch({ type: actionsType.AUTH_LOGIN_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: actionsType.AUTH_FAIL,
      payload: error.response.data,
    });
  }
};

export const logout = () => async (dispatch) => {
  await dispatch({ type: actionsType.AUTH_LOGOUT });
};
