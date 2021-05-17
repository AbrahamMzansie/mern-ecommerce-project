import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layout";
import ShowSpinner from "../../../components/UI/Spinner";
import { getProductDetailsById } from "../../../actions/productActions";
import { addToCart } from "../../../actions/cartActions";
import { useDispatch, useSelector } from "react-redux";
import { IoIosArrowForward, IoIosStar, IoMdCart } from "react-icons/io";
import { BiRupee } from "react-icons/bi";
import { AiFillThunderbolt } from "react-icons/ai";
import { MaterialButton } from "../../../components/MaterialUI";
import "./style.css";
import { imageURL } from "../../../urlConfig";

const ProductDetails = (props) => {
  const productData = useSelector((state) => state.product);
  const [currentImage, setCurrentImage] = useState("");
  const [indexImage, setIndexImage] = useState(0);

  const currentImageHandler = (e, imageName, index) => {
    e.preventDefault();
    setCurrentImage(imageName);
    setIndexImage(index);
  };
  const dispatch = useDispatch();
  const addToCartHandler = () => {
    const { _id, name, price  } = productData.product;
    const img = productData.product.productPictures[0].img;
    const product = {
      _id,
      name,
      price,
      img,
    };
    dispatch(addToCart(product));
    props.history.push("/cart");
  };

  useEffect(() => {
    const { productId } = props.match.params;
    dispatch(getProductDetailsById(productId));
    console.log(productData);
  }, []);

  return (
    <Layout>
      {productData.loading ? (
        <ShowSpinner
          style={{
            display: "flex",
            justifyContent: "center",
            alignItem: "center",
          }}
        />
      ) : (
        <div className="productDescriptionContainer">
          <div className="flexRow">
            <div className="verticalImageStack">
              {productData.product &&
                productData.product.productPictures &&
                productData.product.productPictures.map((thumb, _index) => (
                  <div
                    onClick={(e) => currentImageHandler(e, thumb.img, _index)}
                    key={thumb._id}
                    className={`thumbnail  ${
                      _index === indexImage ? "active" : ""
                    }`}
                  >
                    <img src={`${imageURL}${thumb.img}`} alt={thumb.img} />
                  </div>
                ))}
              {/*<div className="thumbnail active">
              {
                productData.product &&
                productData.product.productPictures &&
                productData.product.productPictures.map((thumb) => 
                <img src={`${imageURL}${thumb.img}`} alt={thumb.img} />)
              }
            </div> */}
            </div>
            <div className="productDescContainer">
              <div className="productDescImgContainer">
                <img
                  src={`${imageURL}${
                    currentImage
                      ? currentImage
                      : productData.product &&
                        productData.product.productPictures &&
                        productData.product.productPictures[0].img
                  }`}
                  alt={`${
                    currentImage
                      ? currentImage
                      : productData.product &&
                        productData.product.productPictures &&
                        productData.product.productPictures[0].img
                  }`}
                />
              </div>

              {/* action buttons */}
              <div className="flexRow">
                <MaterialButton
                  userCick={addToCartHandler}
                  title="ADD TO CART"
                  bgColor="#ff9f00"
                  textColor="#ffffff"
                  style={{
                    marginRight: "5px",
                  }}
                  icon={<IoMdCart />}
                />
                <MaterialButton
                  title="BUY NOW"
                  bgColor="#fb641b"
                  textColor="#ffffff"
                  style={{
                    marginLeft: "5px",
                  }}
                  icon={<AiFillThunderbolt />}
                />
              </div>
            </div>
          </div>
          <div>
            {/* home > category > subCategory > productName */}
            <div className="breed">
              <ul>
                <li>
                  <a href="#">Home</a>
                  <IoIosArrowForward />
                </li>
                <li>
                  <a href="#">Mobiles</a>
                  <IoIosArrowForward />
                </li>
                <li>
                  <a href="#">Samsung</a>
                  <IoIosArrowForward />
                </li>
                <li>
                  <a href="#">{productData.product.name}</a>
                </li>
              </ul>
            </div>
            {/* product description */}
            <div className="productDetails">
              <p className="productTitle">{productData.product.name}</p>
              <div>
                <span className="ratingCount">
                  4.3 <IoIosStar />
                </span>
                <span className="ratingNumbersReviews">
                  72,234 Ratings & 8,140 Reviews
                </span>
              </div>
              <div className="extraOffer">
                Extra <BiRupee />
                4500 off{" "}
              </div>
              <div className="flexRow priceContainer">
                <span className="price">
                  <BiRupee />
                  {productData.product.price}
                </span>
                <span className="discount" style={{ margin: "0 10px" }}>
                  22% off
                </span>
                {/* <span>i</span> */}
              </div>
              <div>
                <p
                  style={{
                    color: "#212121",
                    fontSize: "14px",
                    fontWeight: "600",
                  }}
                >
                  Available Offers
                </p>
                <p style={{ display: "flex" }}>
                  <span
                    style={{
                      width: "100px",
                      fontSize: "12px",
                      color: "#878787",
                      fontWeight: "600",
                      marginRight: "20px",
                    }}
                  >
                    Description
                  </span>
                  <span
                    style={{
                      fontSize: "12px",
                      color: "#212121",
                    }}
                  >
                    {productData.product.description}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default ProductDetails;
