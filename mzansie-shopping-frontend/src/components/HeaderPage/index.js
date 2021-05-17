import React, { useEffect, useState } from "react";
import "./style.css";
import flipkartLogo from "../../images/flipkart.png";
import goldenStar from "../../images/golden-star.png";
import { login , signout } from "../../actions/authActions";
import {
  IoIosNotifications,
  IoIosArrowDown,
  IoIosCart,
  IoIosSearch,
} from "react-icons/io";
import {
  Modal,
  MaterialInput,
  MaterialButton,
  DropdownMenu,
} from "../MaterialUI";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../UI/Spinner";
import ShowAlertScreen from "../UI/ShowAlertScreen";

const Header = (props) => {
  const [loginModal, setLoginModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const userSignout = ()=>{
    dispatch(signout());
   
  }
  const userLogin = () => {
    const user = {
      email: email,
      password: password,
    };
    dispatch(login(user));
  
  };

  useEffect(()=>{
    if(auth.authenticate){
      setLoginModal(false);
    }
  } , [auth.authenticate]);

  const renderLoggedInMenu = ()=>{
   return (
    <DropdownMenu
    menu={
      <a className="fullName" onClick={() => setLoginModal(true)}>
        {auth && auth.user && auth.user.firstName}
      </a>
    }
    menus={[
      { label: "My Profile", href: "", icon: null },
      { label: "SuperCoin Zone", href: "", icon: null },
      { label: "Flipkart Plus Zone", href: "", icon: null },
      { label: "Orders", href: "", icon: null },
      { label: "Wishlist", href: "", icon: null },
      { label: "My Chat", href: "", icon: null },
      { label: "Coupons", href: "", icon: null },
      { label: "Notifications", href: "", icon: null },
      { label: "Rewards", href: "", icon: null },
      { label: "Gift Cards", href: "", icon: null },
      { label: "Logout", href: "", icon: null , onClick : userSignout },
    ]}
    
  />
   )
  };
  const renderNonLoggedInMenu = ()=>{
   return (
    <DropdownMenu
    menu={
      <a className="loginButton" onClick={() => setLoginModal(true)}>
        Login
      </a>
    }
    menus={[
      { label: "My Profile", href: "", icon: null },
      { label: "Flipkart Plus Zone", href: "", icon: null },
      { label: "Orders", href: "", icon: null },
      { label: "Wishlist", href: "", icon: null },
      { label: "Rewards", href: "", icon: null },
      { label: "Gift Cards", href: "", icon: null },
    ]}
    firstMenu={
      <div className="firstmenu">
        <span>New Customer?</span>
        <a style={{ color: "#2874f0" }}>Sign Up</a>
      </div>
    }
  />
   )
  };

  return (
    <div className="header">
      <Modal visible={loginModal} onClose={() => setLoginModal(false)}>
        <div className="authContainer">
          <div className="row">
            <div className="leftspace">
              <h2>Login</h2>
              <p>Get access to your Orders, Wishlist and Recommendations</p>
            </div>
            <div className="rightspace">
              <MaterialInput
                type="text"
                label="Enter Email/Enter Mobile Number"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <MaterialInput
                type="password"
                label="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                rightElement={<a href="#">Forgot?</a>}
              />
              {auth && !auth.loading && auth.error ? (
                <ShowAlertScreen
                variant = "danger"
                message={auth.error} />
              ) : null}
              <MaterialButton
                userCick={userLogin}
                style={{ margin: "40px 0 30px 0" }}
                title={auth && auth.loading ? <Spinner /> : "Login"}
                bgColor="#fb641b"
                textColor="#ffffff"
              />
              <p style={{ fontWeight: "bold" }}>OR</p>

              <MaterialButton
                style={{ margin: "10px 0 30px 0" }}
                title="Request OTP"
                bgColor="#fb641b"
                textColor="#ffffff"
              />
            </div>
          </div>
        </div>
      </Modal>
      <div className="subHeader">
        <div className="logo">
          <a href="">
            <img src={flipkartLogo} className="logoimage" alt="" />
          </a>
          <a style={{ marginTop: "-10px" }}>
            <span className="exploreText">Explore</span>
            <span className="plusText">Plus</span>
            <img src={goldenStar} className="goldenStar" alt="" />
          </a>
        </div>
        <div
          style={{
            padding: "0 10px",
          }}
        >
          <div className="searchInputContainer">
            <input
              className="searchInput"
              placeholder={"search for products, brands and more"}
            />
            <div className="searchIconContainer">
              <IoIosSearch
                style={{
                  color: "#2874f0",
                }}
              />
            </div>
          </div>
        </div>
        <div className="rightMenu">
          {auth.authenticate ? renderLoggedInMenu() : renderNonLoggedInMenu()}
          <DropdownMenu
            menu={
              <a className="more">
                <span>More</span>
                <IoIosArrowDown />
              </a>
            }
            menus={[
              {
                label: "Notification Preference",
                href: "",
                icon: "IoIosNotifications",
              },
              { label: "Sell on flipkart", href: "", icon: null },
              { label: "24x7 Customer Care", href: "", icon: null },
              { label: "Advertise", href: "", icon: null },
              { label: "Download App", href: "", icon: null },
            ]}
          />
          <div>
            <a className="cart">
              <IoIosCart />
              <span style={{ margin: "0 10px" }}>Cart</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
