import { authReducer } from "../reducers/authReducer";
import { userReducer } from "../reducers/userReducer";
import { categoryReducer } from "../reducers/categoryReducer";
import { productReducer } from "../reducers/productReducer";
import { pageReducer } from "../reducers/pageReducer";
import { orderReducer } from "../reducers/orderReducer";
import {cartReducer} from "../reducers/cartReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  product: productReducer,
  category: categoryReducer,
  page: pageReducer,
  cart : cartReducer,
  order: orderReducer,
});

export default rootReducer;
