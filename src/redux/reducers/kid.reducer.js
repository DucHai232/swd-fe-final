import actionsType from "../actions/action.types";

const kidReducer = (
  state = { dataKids: [], loading: false, error: "" },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case actionsType.KID_START:
      return { ...state, loading: true };
    case actionsType.GET_KID_SUCCESS:
      return {
        ...state,
        dataKids: payload?.kidProfilesByUserId,
        loading: false,
        error: "",
      };
    case actionsType.KID_CREATE_SUCCESS:
      const newKidProfile = [...state.dataKids, payload];
      return {
        ...state,
        dataKids: newKidProfile,
        loading: false,
      };
    case "KID_BAN_SUCCESS":
      const { id, status } = payload;
      const banKidProfile = state.dataKids?.map((profile) => {
        if (profile.id === id) {
          return { ...profile, status };
        }
        return profile;
      });
      return { ...state, dataKids: banKidProfile, loading: false };
    case actionsType.KID_FAIL:
      return { ...state, loading: false, error: payload };
    default:
      return { ...state };
  }
};

export default kidReducer;
