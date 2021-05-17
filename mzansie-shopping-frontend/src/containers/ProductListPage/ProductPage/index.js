import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPageProduct } from "../../../actions/pageAction";
import params from "../../../utils/params";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import ShowSpinner from "../../../components/UI/Spinner";
import { Carousel } from "react-bootstrap";
import Card from "../../../components/UI/Card";

import "./style.css";

const ProductPage = (props) => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.page);
  const { page, error, loading } = product;
  console.log(page);
  useEffect(() => {
    const param = params(props.location.search);
    const payload = {
      param,
    };
    dispatch(getPageProduct(payload.param));
  }, []);
  return (
    <div style={{ margin: "0 10px" }}>
      {loading ? (
        <ShowSpinner
          style={{
            display: "flex",
            justifyContent: "center",
            alignItem: "center",
          }}
        />
      ) : (
        <>
          <Carousel>
            {page.bannerImages &&
              page.bannerImages.map((_banner) => (
                <Carousel.Item key={_banner._id}>
                  <img className="d-block w-100" src={_banner.img} alt="" />
                </Carousel.Item>
              ))}
          </Carousel>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "10px 5px",
              flexWrap: "wrap",
            }}
          >
            {page.productImages &&
              page.productImages.map((item) => (
                <Card
                  style={{
                    overflow: "hidden",
                    width: "180px",
                    height: "200px",
                    textAlign: "center",
                    padding: "10px 0",
                  }}
                  key={item._id}
                >
                  <img
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      objectFit: "center",
                    }}
                    src={item.img}
                    alt=""
                  />
                </Card>
              ))}
          </div>
        </>
      )}
    </div>
  );
};
export default ProductPage;
