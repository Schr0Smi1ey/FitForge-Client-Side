import { useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import AOS from "aos";
import "aos/dist/aos.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import slide1 from "../../../../assets/Home/Banner/1.png";
import slide2 from "../../../../assets/Home/Banner/2.png";
import slide3 from "../../../../assets/Home/Banner/3.png";
import slide4 from "../../../../assets/Home/Banner/4.png";
import slide5 from "../../../../assets/Home/Banner/5.png";
import slide6 from "../../../../assets/Home/Banner/6.png";

const sliderContent = [
  {
    title: "Unleash Your Inner Athlete",
    description:
      "Break limits, build strength, and transform your fitness journey. Your goals are closer than you think!",
    buttonText: "Start Training",
    imgSrc: slide1,
  },
  {
    title: "Fitness Meets Community",
    description:
      "Join a tribe of motivated individuals pushing toward greatness. Your journey is better together!",
    buttonText: "Join Us",
    imgSrc: slide2,
  },
  {
    title: "Elevate Your Routine",
    description:
      "Experience expert-led training programs tailored to your unique fitness level.",
    buttonText: "Find a Program",
    imgSrc: slide3,
  },
  {
    title: "Train Smarter, Not Just Harder",
    description:
      "From personalized coaching to high-tech fitness tracking, optimize every rep.",
    buttonText: "Explore Features",
    imgSrc: slide4,
  },
  {
    title: "Fuel Your Fire",
    description:
      "Your potential is limitless. FitForge is here to ignite the power within you.",
    buttonText: "Discover More",
    imgSrc: slide5,
  },
  {
    title: "Results That Speak",
    description:
      "Every milestone is a victory. Track your progress and celebrate your wins!",
    buttonText: "Track Progress",
    imgSrc: slide6,
  },
];

const Banner = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="container mx-auto py-24">
      <Carousel
        className="relative"
        infiniteLoop
        autoPlay
        interval={3000}
        showStatus={false}
        showThumbs={false}
      >
        {sliderContent.map((slide, index) => (
          <div key={index} className="relative">
            <img
              src={slide.imgSrc}
              alt="Fitness Banner"
              className="w-full object-cover"
            />
            <div
              className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/90 flex flex-col justify-center items-center text-white text-center p-6"
              data-aos="fade-up"
            >
              <h1
                className="text-3xl md:text-5xl font-extrabold mb-4"
                data-aos="zoom-in"
                data-aos-delay="200"
              >
                {slide.title}
              </h1>
              <p
                className="max-w-2xl mx-auto text-lg md:text-xl text-gray-300 mb-6"
                data-aos="fade-up"
                data-aos-delay="400"
              >
                {slide.description}
              </p>
              <button
                className="bg-primary text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:brightness-110 transition-all"
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
