import actionsType from "../actions/action.types";

const authReducer = (
  state = { auth: [], loading: false, error: "", res: null },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case actionsType.AUTH_START:
      return { ...state, loading: true };
    case actionsType.AUTH_LOGIN_SUCCESS:
      localStorage.setItem("user", JSON.stringify(payload));
      return {
        ...state,
        auth: payload,
        loading: false,
        error: "",
        res: payload,
      };
    case actionsType.AUTH_FAIL:
      return { ...state, loading: false, error: "", res: payload };
    case actionsType.AUTH_LOGOUT:
      localStorage.removeItem("user");
      return { ...state, auth: [], loading: false, error: "" };
    default:
      return { ...state };
  }
};

export default authReducer;
