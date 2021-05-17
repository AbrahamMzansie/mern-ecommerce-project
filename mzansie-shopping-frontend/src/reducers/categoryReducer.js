import { categoryConstants, createCategoryConstants } from "../constants";
const INITIALSTATE = {
  error: null,
  message: null,
  loading: false,
  categories: [],
  category: null,
};

const buildNewCategories = (parentId, categories, newCategory) => {
  let newCategories = [];
  for (let cat of categories) {
    if (parentId == undefined) {
      return [
        ...categories,
        {
          _id: newCategory._id,
          name: newCategory.name,
          slug: newCategory.slug,
          children: [],
        },
      ];
    }
    if (cat._id === parentId) {
      newCategories.push({
        ...cat,
        children: cat.children
          ? buildNewCategories(
              parentId,
              [
                ...cat.children,
                {
                  _id: newCategory._id,
                  name: newCategory.name,
                  slug: newCategory.slug,
                  parentId: newCategory.parentId,
                  children: newCategory.children,
                },
              ],
              newCategory
            )
          : [],
      });
    } else {
      newCategories.push({
        ...cat,
        children: cat.children
          ? buildNewCategories(parentId, cat.children, newCategory)
          : [],
      });
    }
  }
  return newCategories;
};
export const categoryReducer = (state = INITIALSTATE, action) => {
  switch (action.type) {
    case categoryConstants.FETCH_ALL_CATEGORIES_REQUEST:
      return (state = {
        ...state,
        error: null,
        message: null,
        loading: true,
        categories: null,
      });
    case categoryConstants.FETCH_ALL_CATEGORIES_SUCCESS:
      return (state = {
        ...state,
        loading: false,
        categories: action.payload.categories,
      });

    case categoryConstants.FETCH_ALL_CATEGORIES_FAIL:
      return (state = {
        ...state,
        loading: false,
        error: action.payload,
      });

    //////////////////////////////////////////////////////////
    /////////////////////ADD A NEW CATEGORY//////////////////
    ////////////////////////////////////////////////////////
    case createCategoryConstants.CREATE_CATEGORY_REQUEST:
      return (state = {
        ...state,
        error: null,
        loading: true,
        category: null,
      });
    case createCategoryConstants.CREATE_CATEGORY_SUCCESS:
      const cate = action.payload.category;
      return (state = {
        ...state,
        loading: false,
        category: action.payload.category,
        categories: buildNewCategories(cate.parentId, state.categories, cate),
      });

    case createCategoryConstants.CREATE_CATEGORY_FAIL:
      return (state = {
        ...state,
        loading: false,
        error: action.payload,
      });

    default:
      return state;
  }
};
