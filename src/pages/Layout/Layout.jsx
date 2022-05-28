import Footer from "components/Footer/Footer";
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import "./layout.scss";

function Layout(props) {
  return (
    <>
      <Navbar
        handleSubmit={props.handleSubmit}
        handleChange={props.handleChange}
        handleFeatured={props.handleFeatured}
        loaded={props.loaded}
        searchTerm={props.searchTerm}
      />
      <div className="Center">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default Layout;
