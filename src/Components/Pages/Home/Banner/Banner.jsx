import { useContext, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import AOS from "aos";
import "aos/dist/aos.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import slide1 from "../../../../assets/Home/Banner/slide-1.png";
import slide2 from "../../../../assets/Home/Banner/slide-2.png";
import slide3 from "../../../../assets/Home/Banner/slide-3.png";
import slide4 from "../../../../assets/Home/Banner/slide-4.png";
import slide5 from "../../../../assets/Home/Banner/slide-5.png";
import slide6 from "../../../../assets/Home/Banner/6.png";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../Contexts/AuthContext/AuthProvider";

const Banner = () => {
  const { user } = useContext(AuthContext);
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
    AOS.init({ duration: 500 });
  }, []);
  const navigate = useNavigate();
  return (
    <div className="container mx-auto py-24">
      <Carousel
        className="relative"
        infiniteLoop
        autoPlay
        useKeyboardArrows={true}
        interval={3000}
        showStatus={false}
        showThumbs={false}
      >
        {sliderContent.map((slide, index) => (
          <div key={index} className="relative">
            <img
              src={slide.imgSrc}
              alt="Fitness Banner"
              className="w-full min-h-96 object-cover"
            />
            <div
              className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/90 flex flex-col justify-center items-center text-white text-center p-6"
              data-aos="fade-up"
            >
              <h1
                className="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-4"
                data-aos="zoom-in"
                data-aos-delay="200"
              >
                {slide.title}
              </h1>
              <p
                className="max-w-md sm:max-w-2xl mx-auto text-lg md:text-xl text-gray-300 mb-4"
                data-aos="fade-up"
                data-aos-delay="400"
              >
                {slide.description}
              </p>
              <button
                onClick={() => {
                  navigate(slide.buttonNavigateTo);
                }}
                className="bg-primary text-white font-semibold px-4 py-1 md:px-6 md:py-3 rounded-lg shadow-md hover:brightness-110 transition-all"
                data-aos="fade-up"
                data-aos-delay="600"
              >
                {slide.buttonText}
              </button>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;
