import React, { useContext, useEffect } from "react";
import "aos/dist/aos.css";
import Aos from "aos";
import "./About.css";
import { AuthContext } from "../../../../Contexts/AuthContext/AuthProvider";

const About = () => {
  useEffect(() => {
    Aos.init({ duration: 500 });
  }, []);
  const { user } = useContext(AuthContext);
  return (
    <section
      className="relative parallax text-white min-h-96 container my-10 mx-auto"
      style={{
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      <div className=" z-10 md:w-1/2 p-2 text-white text-center md:text-left mb-8 md:mb-0">
        <div
          className="absolute inset-0 flex flex-col justify-center items-center text-center md:text-left px-4 sm:px-8"
          data-aos="fade-up"
        >
          <h2
            data-aos="fade-up"
            className="text-2xl lg:text-4xl font-bold text-white mb-2 md:mb-4 lg:mb-6"
          >
            About <span className="text-primary">FitForge</span>
          </h2>
          <p
            data-aos="fade-up"
            className="text-sm md:text-base lg:text-lg text-white leading-relaxed max-w-3xl"
          >
            FitForge is a state-of-the-art fitness community that provides
            personalized training plans, expert coaching, and a welcoming
            atmosphere for individuals looking to take their fitness journey to
            the next level. We believe in empowering our members to reach their
            full potential through customized fitness programs, group classes,
            and cutting-edge equipment.
          </p>
          <a
            data-aos="fade-up"
            href={user ? "/classes" : "/signup"}
            className="mt-2 md:mt-4 lg:mt-6 inline-block bg-white text-primary py-1 lg:py-3 px-5 lg:px-8 rounded-lg font-semibold hover:bg-gray-200 transition duration-300 shadow-md"
          >
            Get Started
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;
