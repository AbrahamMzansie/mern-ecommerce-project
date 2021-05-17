import React, { useEffect } from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategory } from "../../actions/categoryActions";

const MenuHeader = () => {
  const category = useSelector((state) => state.category);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCategory());
  }, []);

  const renderCategories = (categories) => {
    let categoryList = [];
    for (let category of categories) {
      categoryList.push(
        <li key={category._id}>
          {category.parentId ? (
            <a
              href={`/${category.slug}?cId=${category._id}&type=${category.type}`}
            >
              {category.name}
            </a>
          ) : (
            <span>{category.name}</span>
          )}

          {category && category.children && category.children.length > 0 ? (
            <ul>{renderCategories(category.children)}</ul>
          ) : (
            []
          )}
        </li>
      );
    }
    return categoryList;
  };
  return (
    <div className="menuHeader">
      <ul>
        {category && category.categories && category.categories.length > 0
          ? renderCategories(category.categories)
          : null}
      </ul>
    </div>
  );
};

export default MenuHeader;
