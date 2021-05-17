import { productConstants, productDetailsConstants } from "../constants";

const INITIALSTATE = {
  loading: false,
  error: null,
  products: [],
  product: {},
  productsByPrice: {},
};

export const productReducer = (state = INITIALSTATE, action) => {
  switch (action.type) {
    case productConstants.GET_ALL_PRODUCT_REQUEST:
      return (state = {
        ...state,
        loading: true,
        error: null,
      });

    case productConstants.GET_ALL_PRODUCT_SUCCESS:
      return (state = {
        ...state,
        loading: false,
        products: action.payload.products,
        productsByPrice: action.payload.productsByPrice,
      });

    case productConstants.GET_ALL_PRODUCT_FAIL:
      return (state = {
        ...state,
        loading: false,
        error: action.payload,
      });

    case productDetailsConstants.GET_PRODUCT_DETAILS_BY_ID_REQUEST:
      return (state = {
        ...state,
        loading: true,
        error: null,
        product: {},
      });

    case productDetailsConstants.GET_PRODUCT_DETAILS_BY_ID_SUCCESS:
      return (state = {
        ...state,
        loading: false,
        product: action.payload.product,
      });

    case productDetailsConstants.GET_PRODUCT_DETAILS_BY_ID_FAIL:
      return (state = {
        ...state,
        loading: false,
        error: action.payload,
      });

    default:
      return state;
  }
};
