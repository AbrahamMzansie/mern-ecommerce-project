import "./App.css";
import React, { useEffect } from "react";
import Home from "./containers/Home";
import Signin from "./containers/Signin";
import Signup from "./containers/Signup";
import PrivateRoute from "./components/HOC/privateRoute";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { isUserLoggedIn } from "./actions/authActions";
import Products from "./containers/Products";
import Orders from "./containers/Orders";
import Category from "./containers/Category";
import Page from "./components/NewPage";
import { getInitialData } from "./actions/initialDataActions";

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  useEffect(() => {
    if (auth && !auth.authenticate) {
      dispatch(isUserLoggedIn());
    };
    if (auth && auth.authenticate) {
      dispatch(getInitialData());
    };
  }, [auth.authenticate]);
  return (
    <div className="App">
      <Switch>
        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
        <PrivateRoute exact path="/category" component={Category} />
        <PrivateRoute exact path="/products" component={Products} />
        <PrivateRoute exact path="/orders" component={Orders} />
        <PrivateRoute exact path="/page" component={Page} />
        <PrivateRoute exact path="/" component={Home} />
      </Switch>
    </div>
  );
}

export default App;
