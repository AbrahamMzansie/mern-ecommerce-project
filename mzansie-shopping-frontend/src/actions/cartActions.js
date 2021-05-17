import { cartConstants } from "../constants";
import store from "../store";
import { exception } from "../Exceptions";

export const addToCart = (product , newQty = 1) => {
  return async (dispatch) => {
    try {
      const { cartItems } = store.getState().cart;

      const quantity = cartItems[product._id]
        ? parseInt(cartItems[product._id].quantity + newQty)
        : 1;
      cartItems[product._id] = {
        ...product,
        quantity,
      };
      localStorage.setItem("cart", JSON.stringify(cartItems));
      dispatch({
        type: cartConstants.ADD_TO_CART,
        payload: {
          cartItems,
        },
      });
    } catch (error) {
      dispatch({
        type: cartConstants.ADD_TO_CART_FAIL,
        payload: exception(error),
      });
    }
  };
};

export const updateCart = () => {
  return async (dispatch) => {
    try {
      const cart = localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart"))
        : null;
      if (cart) {
        dispatch({
          type: cartConstants.ADD_TO_CART,
          payload: {
            cartItems: cart,
          },
        });
      }
    } catch (error) {
      dispatch({
        type: cartConstants.ADD_TO_CART_FAIL,
        payload: exception(error),
      });
    }
  };
};
