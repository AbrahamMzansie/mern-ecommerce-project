import { categoryConstants } from "../constants";
import axiosInstance from "../helpers/axios";
import { exception } from "../Exceptions";

export const getAllCategory = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: categoryConstants.FETCH_ALL_CATEGORIES_REQUEST });
      const response = await axiosInstance.get("/category/getcategories");
      if (response.status === 200 || response.status === 201) {
        const { categoryList } = response.data;
        console.log(response.data);
        dispatch({
          type: categoryConstants.FETCH_ALL_CATEGORIES_SUCCESS,
          payload: { categories: categoryList },
        });
      }
    } catch (error) {
      dispatch({
        type: categoryConstants.FETCH_ALL_CATEGORIES_FAIL,
        payload: exception(error),
      });
    }
  };
};

