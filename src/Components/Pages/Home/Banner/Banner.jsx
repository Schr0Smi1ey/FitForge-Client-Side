import React, { useContext, useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import slide1 from "../../../../assets/Home/Banner/slide-1.png";
import slide2 from "../../../../assets/Home/Banner/slide-2.png";
import slide3 from "../../../../assets/Home/Banner/slide-3.png";
import slide4 from "../../../../assets/Home/Banner/slide-4.png";
import slide5 from "../../../../assets/Home/Banner/slide-5.png";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../Contexts/AuthContext/AuthProvider";

const Banner = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [startX, setStartX] = useState(null); // For swipe tracking

  const sliderContent = [
    {
      title: "Forge Your Fitness Journey",
      description:
        "Unlock your true potential with personalized training programs designed for every fitness level.",
      buttonText: "Get Started",
      buttonNavigateTo: user ? "/classes" : "/signup",
      imgSrc: slide1,
    },
    {
      title: "Stronger Together",
      description:
        "Join a vibrant community where fitness meets support. Your transformation starts with us.",
      buttonText: "Explore Community",
      buttonNavigateTo: "/community",
      imgSrc: slide2,
    },
    {
      title: "Train with the Best",
      description:
        "Our expert trainers are here to guide you every step of the way. Achieve your fitness goals with the best in the business.",
      buttonText: "Explore Trainers",
      buttonNavigateTo: "/trainers",
      imgSrc: slide3,
    },
    {
      title: "Your Fitness, Your Way",
      description:
        "Find the perfect class with our best trainers for your fitness journey. From high-intensity workouts to relaxing yoga sessions, we've got you covered.",
      buttonText: "Explore Programs",
      buttonNavigateTo: "/classes",
      imgSrc: slide4,
    },
    {
      title: "Commit. Conquer. Repeat.",
      description:
        "Consistency breeds greatness. Start your journey today and redefine what's possible.",
      buttonText: "Start Now",
      buttonNavigateTo: user ? "/classes" : "/signup",
      imgSrc: slide5,
    },
  ];

  useEffect(() => {
    AOS.init({ offset: 0, duration: 400, easing: "ease-in-sine" });
  }, []);

  useEffect(() => {
    let interval;
    if (!isHovered) {
      interval = setInterval(() => {
        nextSlide();
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [isHovered]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowRight") nextSlide();
      if (event.key === "ArrowLeft") prevSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const nextSlide = () => {
    setIndex((prevIndex) => (prevIndex + 1) % sliderContent.length);
  };

  const prevSlide = () => {
    setIndex((prevIndex) =>
      prevIndex === 0 ? sliderContent.length - 1 : prevIndex - 1
    );
  };

  // ✅ Handle Swipe Gesture for Touch Devices & Mouse Drag
  const handleTouchStart = (e) => {
    setStartX(e.touches ? e.touches[0].clientX : e.clientX);
  };

  const handleTouchEnd = (e) => {
    if (startX === null) return;
    const endX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
    const diff = startX - endX;

    if (diff > 50) {
      nextSlide(); // Swipe left → go to next slide
    } else if (diff < -50) {
      prevSlide(); // Swipe right → go to previous slide
    }

    setStartX(null);
  };

  const { imgSrc, title, description, buttonText, buttonNavigateTo } =
    sliderContent[index];

  return (
    <div
      className="container mx-auto py-24 relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleTouchStart}
      onMouseUp={handleTouchEnd}
    >
      {/* Slide */}
      <div key={index} className="relative">
        <img src={imgSrc} alt="Fitness Banner" className="w-full min-h-96" />
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/90 flex flex-col justify-center items-center text-white text-center p-6"
          data-aos="fade-up"
        >
          <h1
            className="text-3xl lg:text-4xl font-extrabold mb-4"
            data-aos="zoom-in"
            data-aos-delay="100"
          >
            {title}
          </h1>
          <p
            className="w-[85%] sm:w-full text-center mx-auto text-lg md:text-xl text-gray-300 mb-4"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            {description}
          </p>
          <button
            onClick={() => navigate(buttonNavigateTo)}
            className="bg-primary text-white font-semibold px-4 py-1 md:px-6 md:py-3 rounded-lg shadow-md hover:brightness-110 transition-all"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            {buttonText}
          </button>
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-0 transform -translate-y-1/2 text-white p-1 rounded-full hover:bg-black/80 transition"
      >
        ❮
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-0 transform -translate-y-1/2 text-white p-1 rounded-full hover:bg-black/80 transition"
      >
        ❯
      </button>

      {/* Slide Indicator Dots */}
      <div className="absolute bottom-[21%] sm:bottom-[20%] md:bottom-[19%] lg:bottom-[17%] xl:bottom-[12%] left-1/2 transform -translate-x-1/2 flex space-x-2">
        {sliderContent.map((_, idx) => (
          <span
            key={idx}
            className={`h-2 w-2 rounded-full transition-all ${
              index === idx ? "bg-white scale-125" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;
