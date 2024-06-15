import actionsType from "../actions/action.types";

const packageReducer = (
  state = { packages: [], loading: false, error: "", res: null },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case actionsType.PACKAGE_START:
      return { ...state, loading: true };
    case actionsType.GET_PACKAGE_SUCCESS:
      return {
        ...state,
        packages: payload?.packages,
        loading: false,
        error: "",
        res: payload,
      };
    case actionsType.PACKAGE_FAIL:
      return { ...state, loading: false, error: payload };

    default:
      return { ...state };
  }
};

export default packageReducer;
