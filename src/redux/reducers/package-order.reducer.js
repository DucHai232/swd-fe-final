import actionsType from "../actions/action.types";

const packageOrderReducer = (
  state = {
    packageOrders: [],
    order: null,
    loading: false,
    error: "",
    res: null,
  },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case actionsType.PACKAGE_ORDER_START:
      return { ...state, loading: true };
    case actionsType.PACKAGE_ORDER_SUCCESS:
      const newPackageOrders = [...state.packageOrders, payload];
      return {
        ...state,
        packageOrders: newPackageOrders,
        order: payload,
        loading: false,
        error: "",
      };

    case actionsType.GET_PACKAGE_ORDER_SUCCESS:
      return {
        ...state,
        packageOrders: payload,
        loading: false,
        res: payload,
      };
    case actionsType.PACKAGE_ORDER_FAIL:
      return { ...state, loading: false, error: payload };

    default:
      return { ...state };
  }
};

export default packageOrderReducer;
