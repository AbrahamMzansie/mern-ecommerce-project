import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../components/UI/Card";
import Layout from "../../components/Layout";
import CartItem from "../CartPage/CartItem";
import ShowSpinner from "../../components/UI/Spinner";
import { addToCart } from "../../actions/cartActions";

import "./style.css";

const CartPage = (props) => {
  const cart = useSelector((state) => state.cart);
  const [cartItems, setCartItems] = useState(cart.cartItems);
  useEffect(() => {
    setCartItems(cart.cartItems);
  }, [cart.cartItems]);

  const dispatch = useDispatch();
  const onQuantityIncrementHandler = (_id, qty) => {
    const quantity = qty;
    const { name, price, img } = cartItems[_id];
    dispatch(addToCart({ _id, name, price, img, quantity } , +1));
  };

  const onQuantityDecrementHandler = (_id, qty) => {
    const quantity = qty;
    const { name, price, img } = cartItems[_id];
    dispatch(addToCart({ _id, name, price, img, quantity } , -1));
  };

  return (
    <Layout>
      {cartItems ? (
        <div className="cartContainer" style = {{alignItems : "flex-start"}}>
          <Card headerLeft={"My Cart"} headerRight={<div>Deliver To</div>}>
            {cartItems &&
              Object.keys(cartItems).map((key, index) => (
                <CartItem
                  onQuantityIncrement={onQuantityIncrementHandler}
                  onQuantityDecrement={onQuantityDecrementHandler}
                  key={cartItems[key]._id}
                  cartItem={cartItems[key]}
                />
              ))}
          </Card>
          <Card
          headerLeft = "Price"
            style={{
              width: "500px",
            }}
          >
         
          </Card>
        </div>
      ) : (
        <ShowSpinner
          style={{
            display: "flex",
            justifyContent: "center",
            alignItem: "center",
          }}
        />
      )}
    </Layout>
  );
};

export default CartPage;
