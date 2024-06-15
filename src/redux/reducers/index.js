import { combineReducers } from "redux";
import authReducer from "./auth.reducer";
import boxReducer from "./box.reducer";
import packageReducer from "./package.reducer";
import productReducer from "./product.reducer";
import themeReducer from "./theme.reducer";
import kidReducer from "./kid.reducer";
import packageOrderReducer from "./package-order.reducer";
export const reducers = combineReducers({
  authReducer,
  boxReducer,
  packageReducer,
  productReducer,
  themeReducer,
  kidReducer,
  packageOrderReducer,
});
