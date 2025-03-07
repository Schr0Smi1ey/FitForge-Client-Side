import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Newsletter = () => {
  useEffect(() => {
    AOS.init({ duration: 500 });
  }, []);

  return (
    <div className="container mx-auto py-8 rounded-md px-6 md:px-12 lg:px-20 mt-10">
      <div
        className="bg-primary text-white p-8 md:p-12 rounded-2xl shadow-xl text-center relative overflow-hidden"
        data-aos="fade-up"
      >
        <h2
          className="relative text-2xl md:text-4xl font-extrabold mb-3"
          data-aos="fade-down"
        >
          Stay Updated with Our Newsletter
        </h2>
        <p
          className="relative text-sm md:text-base text-white/80 max-w-lg mx-auto mb-6"
          data-aos="fade-up"
        >
          Subscribe to receive the latest news, tips, and exclusive updates
          straight to your inbox.
        </p>

        <form className="relative flex flex-col md:flex-row gap-3 justify-center items-center">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            className="w-full md:w-1/3 px-4 py-3 rounded-lg text-black outline-none border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary transition-all"
            data-aos="zoom-in"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            className="w-full md:w-1/3 px-4 py-3 rounded-lg text-black outline-none border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary transition-all"
            data-aos="zoom-in"
            required
          />
          <button
            type="submit"
            className="w-full md:w-auto bg-gradient-to-r from-white to-gray-200 text-primary font-semibold px-6 py-3 rounded-lg hover:brightness-110 transition-all shadow-md"
            data-aos="zoom-in"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default Newsletter;
