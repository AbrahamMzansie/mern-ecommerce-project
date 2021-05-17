import React, { useState } from "react";
import { imageURL } from "../../../urlConfig";
import "./style.css";

const CartItem = (props) => {
  const [qty, setQty] = useState(props.cartItem.quantity);
  const { _id, name, price, img } = props.cartItem;

  const onQtyIncrement = () => {
    setQty((previousState) => previousState + 1);
    console.log(qty);
    props.onQuantityIncrement(_id, qty + 1);
  };
  const onQtyDecrement = () => {
    if (qty <= 1) return;
    setQty((previousState) => previousState - 1);
    props.onQuantityDecrement(_id, qty - 1);
  };

  return (
    <div className="cartItemContainer">
      <div className="flexRow">
        <div className="cartProImgContainer">
          <img src={`${imageURL}${img}`} alt={img} />
        </div>
        <div className="cartItemDetails">
          <div>
            <p>{name}</p>
            <p>R {price}</p>
          </div>
          <div>Delivery in 3 - 5 days</div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          margin: "5px 0",
        }}
      >
        <div className="quantityControl">
          <button onClick={onQtyDecrement}>-</button>
          <input readOnly value={qty} />

          <button onClick={onQtyIncrement}>+</button>
        </div>
        <button className="cartActionBtn">Save For Later</button>
        <button className="cartActionBtn">Remove</button>
      </div>
    </div>
  );
};

export default CartItem;
