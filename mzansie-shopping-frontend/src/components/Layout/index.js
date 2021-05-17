import React from "react";
import HeaderPage from "../HeaderPage";
import MenuHeader from "../MenuHeader";

const Layout = (props) => {
  return (
    <>
      <HeaderPage />
      <MenuHeader />
      {props.children}
    </>
  );
};

export default Layout;
