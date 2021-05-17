import React from "react";
import { imageURL } from "../../../urlConfig";
import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import Card from "../../../components/UI/Card";

const Products = (props) => {
  return (
    <div>
      <Card
      style = {{width : "calc(100% - 40px)" , margin :"20px auto"}}
      headerLeft = {`${props.header}`}
      headerRight = {<Button className="btn" variant="primary">VIEW ALL</Button>}
      >
        
        <div style = {{display:"flex"}}>
        {props.products &&
          props.products.map((product) => (
            <Link style = {{display : "block"}} to = {`/${product.slug}/${product._id}/p`}  key={product._id} className="productContainer">
              <div  className="productImgContainer">
                <img
                  alt="product-image"
                  src={`${imageURL}${product.productPictures[0].img}`}
                />
              </div>
              <div className="productInfo">
                <div className="">{product.name}</div>
                <span>4.3</span>&nbsp;
                <span>(1,52,463)</span>
                <div className="productPrice">{product.price}</div>
              </div>
            </Link>
          ))}
          </div>
      </Card>
    </div>
  );
};

export default Products;
