import React, { useEffect } from "react";
import "./App.css";

import HomePage from "./containers/HomePage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProductListPage from "./containers/ProductListPage";
import ProductDetails from "./containers/ProductListPage/ProductDetails";
import CartPage from "./containers/CartPage";
import { useSelector, useDispatch } from "react-redux";
import { isUserLoggedIn } from "./actions/authActions";
import {updateCart} from "./actions/cartActions";



const App = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  
  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
  }, [auth.authenticate]);

  useEffect(()=>{
    dispatch(updateCart())
  })

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path = "/cart" component = {CartPage}/>
          <Route path="/:productSlug/:productId/p" component={ProductDetails} />
          <Route path="/:slug" component={ProductListPage} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
