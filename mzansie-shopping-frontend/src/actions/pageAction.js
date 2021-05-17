import { pageConstants } from "../constants";
import { exception } from "../Exceptions";
import axiosInstance from "../helpers/axios";

export const getPageProduct = (payload) => {
  const { type, cId } = payload;
  return async (dispatch) => {
    try {
      dispatch({
        type: pageConstants.PAGE_REQUEST,
      });
      const response = await axiosInstance.get(
        `/admin/page/${cId}/${type}`
      );
      if (response.status === 200 || response.status === 201) {
        const { page } = response.data;
        dispatch({
          type: pageConstants.PAGE_SUCCESS,
          payload: { page: page },
        });
      }
    } catch (error) {
      dispatch({
        type: pageConstants.PAGE_FAIL,
        payload: exception(error),
      });
    }
  };
};
