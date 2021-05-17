import {
  categoryConstants,
  createCategoryConstants,
  updateCategoryConstants,
  deleteCategoryConstants,
} from "../constants";
import axiosInstance from "../helpers/axios";
import { exception } from "../Exceptions";

export const getAllCategory = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: categoryConstants.FETCH_ALL_CATEGORIES_REQUEST });
      const response = await axiosInstance.get("/category/getcategories");
      if (response.status === 200 || response.status === 201) {
        const { categoryList } = response.data;
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

export const createCategory = (form) => {
  return async (dispatch) => {
    try {
      dispatch({ type: createCategoryConstants.CREATE_CATEGORY_REQUEST });
      const response = await axiosInstance.post("/category/create", form);
      if (response.status === 200 || response.status === 201) {
        const { category } = response.data;

        dispatch({
          type: createCategoryConstants.CREATE_CATEGORY_SUCCESS,
          payload: { category: category },
        });
      }
    } catch (error) {
      dispatch({
        type: createCategoryConstants.CREATE_CATEGORY_FAIL,
        payload: exception(error),
      });
    }
  };
};

export const update_Category = (form) => {
  return async (dispatch) => {
    try {
      dispatch({ type: updateCategoryConstants.UPDATE_CATEGORY_REQUEST });
      const response = await axiosInstance.post("/category/update", form);
      if (response.status === 200 || response.status === 201) {
        dispatch({ type: updateCategoryConstants.UPDATE_CATEGORY_SUCCESS });
        dispatch(getAllCategory());
      }
    } catch (error) {
      dispatch({
        type: updateCategoryConstants.UPDATE_CATEGORY_FAIL,
        payload: exception(error),
      });
    }
  };
};

export const deleteCategory = (ids) => {
  return async (dispatch) => {
    try {
      dispatch({ type: deleteCategoryConstants.DELETE_CATEGORY_REQUEST });
      const response = await axiosInstance.post("/category/delete", ids);
      if (response.status === 200 || response.status === 201) {
        dispatch({ type: deleteCategoryConstants.DELETE_CATEGORY_SUCCESS });
        dispatch(getAllCategory());
      }
    } catch (error) {
      dispatch({
        type: deleteCategoryConstants.DELETE_CATEGORY_FAIL,
        payload: exception(error),
      });
    }
  };
};


