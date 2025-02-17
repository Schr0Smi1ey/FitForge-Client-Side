import React from "react";
import about from "../../../../assets/Home/About/1.png";
import SimpleParallax from "simple-parallax-js";

const About = () => {
  return (
    <section className="relative text-white">
      <SimpleParallax scale={1.8}>
        <img src={about} alt="About FirForge" className="object-cover" />
      </SimpleParallax>
      <div className="absolute inset-0 max-w-screen-xl mx-auto px-4 sm:px-8 py-16 flex flex-col-reverse md:flex-row items-center z-10">
        {/* Left Side Content */}
        <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
          <h2 className="text-4xl font-bold mb-6">About FirForge</h2>
          <p className="text-lg leading-relaxed mb-4">
            FirForge is a state-of-the-art fitness community that provides
            personalized training plans, expert coaching, and a welcoming
            atmosphere for individuals looking to take their fitness journey to
            the next level. We believe in empowering our members to reach their
            full potential through customized fitness programs, group classes,
            and cutting-edge equipment.
          </p>
          <p className="text-lg leading-relaxed mb-6">
            Whether you're a beginner or an experienced athlete, our expert
            trainers are here to guide you, and our community will inspire you
            every step of the way. Join us today and forge a stronger, healthier
            version of yourself!
          </p>
          <a
            href="/contact"
            className="inline-block bg-white text-primary py-2 px-6 rounded-lg font-semibold hover:bg-gray-200 transition duration-300"
          >
            Get Started
          </a>
        </div>
      </div>
      <div className="bg-black absolute inset-0 bg-opacity-50"></div>
    </section>
  );
};

export default About;
