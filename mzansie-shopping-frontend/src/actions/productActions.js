import { productConstants, productDetailsConstants } from "../constants";
import { exception } from "../Exceptions";
import axiosInstance from "../helpers/axios";

export const getProductsBySlug = (slug) => {
  return async (dispatch) => {
    try {
      dispatch({ type: productConstants.GET_ALL_PRODUCT_REQUEST });
      const response = await axiosInstance.get(`products/${slug}`);
      if (response.status === 200 || response.status === 201) {
        const { products, productsByPrice } = response.data;
        dispatch({
          type: productConstants.GET_ALL_PRODUCT_SUCCESS,
          payload: { products: products, productsByPrice: productsByPrice },
        });
      }
    } catch (error) {
      dispatch({
        type: productConstants.GET_ALL_PRODUCT_FAIL,
        payload: exception(error),
      });
    }
  };
};

export const getProductDetailsById = (productId) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: productDetailsConstants.GET_PRODUCT_DETAILS_BY_ID_REQUEST,
      });
      const response = await axiosInstance.get(`product/${productId}`);
      console.log(response);
      if (response.status === 200 || response.status === 201) {
        const { product } = response.data;
        dispatch({
          type: productDetailsConstants.GET_PRODUCT_DETAILS_BY_ID_SUCCESS,
          payload: { product: product },
        });
      }
    } catch (error) {
      dispatch({
        type: productDetailsConstants.GET_PRODUCT_DETAILS_BY_ID_FAIL,
        payload: exception(error),
      });
    }
  };
};
