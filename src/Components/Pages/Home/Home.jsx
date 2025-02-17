import React from "react";
import Banner from "./Banner/Banner";
import Featured from "./Featured/Featured";
import About from "./About/About";

const Home = () => {
  return (
    <div className="container mx-auto">
      <Banner></Banner>
      <Featured></Featured>
      <About></About>
    </div>
  );
};

export default Home;
