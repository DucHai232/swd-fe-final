import * as BoxApi from "../../apis/box.request";
import actionsType from "./action.types";
export const getBox = () => async (dispatch) => {
  dispatch({ type: actionsType.BOX_START });
  try {
    const response = await BoxApi.getBox();
    dispatch({ type: actionsType.GET_BOX_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: actionsType.BOX_FAIL, payload: "error" });
  }
};

export const createBox = (dataBox) => async (dispatch) => {
  dispatch({ type: actionsType.BOX_START });
  try {
    const response = await BoxApi.createBox(dataBox);
    dispatch({
      type: actionsType.BOX_CREATE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: actionsType.BOX_FAIL,
      payload: "error",
    });
  }
};
