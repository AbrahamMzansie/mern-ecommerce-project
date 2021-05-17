import { authReducer } from "../reducers/authReducer";
import { userReducer } from "../reducers/userReducer";
import { categoryReducer } from "../reducers/categoryReducer";
import { productReducer } from "../reducers/productReducer";
import { orderReducer } from "../reducers/orderReducer";
import {pageReducer} from "../reducers/pageReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  product: productReducer,
  category: categoryReducer,
  order: orderReducer,
  page : pageReducer,
});

export default rootReducer;
