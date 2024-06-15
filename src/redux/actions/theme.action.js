import * as ThemeApi from "../../apis/theme.request";
import actionsType from "./action.types";
export const getThemes = (search, status) => async (dispatch) => {
  dispatch({ type: actionsType.THEME_START });
  try {
    const response = await ThemeApi.getThemes(search, status);
    dispatch({ type: actionsType.GET_THEME_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: actionsType.THEME_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const createTheme = (dataTheme) => async (dispatch) => {
  dispatch({ type: actionsType.THEME_START });
  try {
    const response = await ThemeApi.createTheme(dataTheme);
    dispatch({
      type: actionsType.THEME_CREATE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: actionsType.THEME_FAIL,
      payload: "error",
    });
  }
};

export const deleteTheme = (themeId, status) => async (dispatch) => {
  dispatch({ type: actionsType.THEME_START });
  try {
    const response = await ThemeApi.deleteTheme(themeId, status);
    dispatch({
      type: actionsType.THEME_DELETE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: actionsType.THEME_FAIL,
      payload: "error",
    });
  }
};
