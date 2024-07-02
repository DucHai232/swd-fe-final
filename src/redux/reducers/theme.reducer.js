import actionsType from "../actions/action.types";

const themeReducer = (
  state = { themes: null, loading: false, error: "", res: null },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case actionsType.THEME_START:
      return { ...state, loading: true };
    case actionsType.GET_THEME_SUCCESS:
      return { ...state, themes: payload.themes, loading: false, error: "" };
    case actionsType.THEME_CREATE_SUCCESS:
      return {
        ...state,
        themes: [...state.themes, payload],
        loading: false,
        res: payload,
      };
    case actionsType.THEME_DELETE_SUCCESS:
      const filterThemes = state.themes.filter((item) => item.status);
      return { ...state, themes: filterThemes, loading: false, res: payload };
    case actionsType.THEME_FAIL:
      return { ...state, loading: false, error: payload };

    default:
      return { ...state };
  }
};

export default themeReducer;
