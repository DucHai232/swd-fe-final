import actionsType from "../actions/action.types";
const boxReducer = (
  state = { boxs: [], loading: false, error: "", res: null },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case actionsType.BOX_START:
      return { ...state, loading: true };
    case actionsType.GET_BOX_SUCCESS:
      return {
        ...state,
        boxs: payload?.mysteryBoxs,
        loading: false,
        error: "",
      };
    case actionsType.BOX_CREATE_SUCCESS:
      return {
        ...state,
        boxs: [...state.boxs, payload],
        loading: false,
        res: payload,
      };
    case actionsType.BOX_FAIL:
      return { ...state, loading: false, error: payload };
    default:
      return { ...state };
  }
};

export default boxReducer;
