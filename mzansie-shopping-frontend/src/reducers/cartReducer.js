import { cartConstants } from "../constants";
const INITIALSTATE = {
  error: null,
  message: null,
  loading: false,
  cartItems: {},
};
export const cartReducer = (state = INITIALSTATE, action) => {
  switch (action.type) {
    case cartConstants.ADD_TO_CART:
      return (state = {
        ...state,
        loading: false,
        cartItems: action.payload.cartItems,
      });

    case cartConstants.ADD_TO_CART_FAIL:
      return (state = {
        ...state,
        loading: false,
        error: action.payload,
      });
    default:
      return state;
  }
};
