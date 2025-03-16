import React from "react";
import Navbar from "../Shared/Navbar/Navbar";
import { ToastContainer } from "react-toastify";
import { Outlet } from "react-router-dom";
import Footer from "../Shared/Footer/Footer";

const Root = () => {
  return (
    <div className="dark:bg-black dark:text-white overflow-x-hidden">
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
      <ToastContainer />
    </div>
  );
};

export default Root;
