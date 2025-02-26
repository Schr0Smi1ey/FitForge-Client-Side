import React, { useEffect } from "react";
import about from "../../../../assets/Home/About/1.png";
import SimpleParallax from "simple-parallax-js";
import "aos/dist/aos.css";
import Aos from "aos";

const About = () => {
  useEffect(() => {
    Aos.init();
  }, []);

  return (
    <section className="relative container mx-auto text-white">
      <SimpleParallax scale={1.8}>
        <img src={about} alt="About FitForge" className="h-full object-cover" />
      </SimpleParallax>
      <div className="absolute inset-0 max-w-screen-xl mx-auto px-4 sm:px-8 py-16 flex flex-col-reverse md:flex-row items-center z-10">
        <div className="md:w-1/2 p-2 text-center md:text-left mb-8 md:mb-0">
          <div
            className="absolute inset-0 flex flex-col justify-center items-center text-center md:text-left px-4 sm:px-8"
            data-aos="fade-right"
          >
            <h2 className="text-2xl lg:text-4xl font-bold text-primary mb-2 md:mb-4 lg:mb-6">
              About <span className="text-white">FitForge</span>
            </h2>
            <p
              data-aos="fade-up"
              className="text-sm md:text-base lg:text-lg text-center leading-relaxed max-w-3xl"
            >
              FitForge is a state-of-the-art fitness community that provides
              personalized training plans, expert coaching, and a welcoming
              atmosphere for individuals looking to take their fitness journey
              to the next level. We believe in empowering our members to reach
              their full potential through customized fitness programs, group
              classes, and cutting-edge equipment.
            </p>
            <a
              href="/contact"
              className="mt-2 md:mt-4 lg:mt-6 inline-block bg-white text-primary py-1 lg:py-3 px-5 lg:px-8 rounded-lg font-semibold hover:bg-gray-200 transition duration-300 shadow-md"
            >
              Get Started
            </a>
          </div>
        </div>
      </div>
      <div className="bg-black absolute inset-0 bg-opacity-50"></div>
    </section>
  );
};

export default About;
