import React from "react";
import Layout from "../../components/Layout";
import ProductStore from "./ProductStore";
import ProductPage from "./ProductPage";
import params from "../../utils/params";

import "./style.css";

const ProductListPage = (props) => {
  const renderProducts = () => {
    const param = params(props.location.search);
    let content = null;
    switch (param.type) {
      case "Store":
        content = <ProductStore {...props} />;
        break;
      case "Page":
        content = <ProductPage {...props} />;
        break;
      default:
        content = <p>Error occured</p>;
        break;
    }
    return content;
  };

  return <Layout>{renderProducts()}</Layout>;
};

export default ProductListPage;
