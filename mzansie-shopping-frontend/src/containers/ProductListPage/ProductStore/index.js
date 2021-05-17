import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsBySlug } from "../../../actions/productActions";
import ShowSpinner from "../../../components/UI/Spinner";
import Products from "../Products";
import "./style.css";

const ProductStore = (props) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProductsBySlug(props.match.params.slug));
  }, []);

  return (
    <>
      {products.loading ? (
        <ShowSpinner
          style={{
            display: "flex",
            justifyContent: "center",
            alignItem: "center",
          }}
        />
      ) : (
        <>
          {products &&
          products.productsByPrice &&
          products.productsByPrice.under5 &&
          products.productsByPrice.under5.length > 0 ? (
            <Products
              header="Budget Phones Below R500"
              products={products.productsByPrice.under5}
            />
          ) : null}

          {products &&
          products.productsByPrice &&
          products.productsByPrice.under1k &&
          products.productsByPrice.under1k.length > 0 ? (
            <Products
              header="Budget Phones Below R1000"
              products={products.productsByPrice.under1k}
            />
          ) : null}

          {products &&
          products.productsByPrice &&
          products.productsByPrice.under2k &&
          products.productsByPrice.under2k.length > 0 ? (
            <Products
              header="Budget Phones Below R2000"
              products={products.productsByPrice.under2k}
            />
          ) : null}

          {products &&
          products.productsByPrice &&
          products.productsByPrice.greterThan2k &&
          products.productsByPrice.greterThan2k.length > 0 ? (
            <Products
              header="Budget Phones More than  R2000"
              products={products.productsByPrice.greterThan2k}
            />
          ) : null}
        </>
      )}
    </>
  );
};

export default ProductStore;
