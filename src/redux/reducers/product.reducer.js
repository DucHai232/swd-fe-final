import actionsType from "../actions/action.types";

const productReducer = (
  state = { products: [], loading: false, error: "", res: null },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case actionsType.PRODUCT_START:
      return { ...state, loading: true };
    case actionsType.GET_PRODUCT_SUCCESS:
      return {
        ...state,
        products: payload?.products,
        loading: false,
        error: "",
      };
    case actionsType.PRODUCT_DELETE_SUCCESS:
      const filterProducts = state.products.filter(
        (item) => item.status == true
      );
      return {
        ...state,
        products: filterProducts,
        loading: false,
        res: payload,
      };
    case actionsType.PRODUCT_CREATE_SUCCESS:
      return {
        ...state,
        products: [...state.products, payload.product],
        loading: false,
        res: payload,
      };
    case actionsType.PRODUCT_FAIL:
      return { ...state, loading: false, error: payload };

    default:
      return { ...state };
  }
};

export default productReducer;
