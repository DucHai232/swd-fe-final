import * as KidApi from "../../apis/kid.request";
import actionsType from "./action.types";
export const getKidProfile = () => async (dispatch) => {
  dispatch({ type: actionsType.KID_START });
  try {
    const response = await KidApi.getKidProfile();
    dispatch({ type: actionsType.GET_KID_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: actionsType.KID_FAIL, payload: "error" });
  }
};

export const createProfileKid = (data) => async (dispatch) => {
  dispatch({ type: actionsType.KID_START });
  try {
    const response = await KidApi.createInfoProfileKid(data);
    dispatch({ type: actionsType.KID_CREATE_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: actionsType.KID_FAIL,
      payload: "",
    });
  }
};

// export const banProfileKid = (id, status) => async (dispatch) => {
//   dispatch({ type: "KID_START" });
//   try {
//     const response = await KidApi.banProfileKid(id, status);
//     dispatch({ type: "KID_BAN_SUCCESS", payload: { id, status } });
//   } catch (error) {
//     dispatch({ type: "KID_FAIL", payload: "Error" });
//   }
// };
