import React from "react";
import Banner from "./Banner/Banner";
import Featured from "./Featured/Featured";
import About from "./About/About";
import FeaturedClasses from "./FeaturedClasses/FeaturedClasses";
import Testimonials from "./Testimonials/Testimonials";
import LatestForumPosts from "./LatestForumPosts/LatestForumPosts";
import Newsletter from "./NewsLetter/NewsLetter";
import Team from "./Team/Team";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <About></About>
      <Featured></Featured>
      <FeaturedClasses></FeaturedClasses>
      <Testimonials></Testimonials>
      <LatestForumPosts></LatestForumPosts>
      <Newsletter></Newsletter>
      <Team></Team>
    </div>
  );
};

export default Home;
