import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import slide1 from "../../../../assets/Home/Banner/1.png";
import slide2 from "../../../../assets/Home/Banner/2.png";
import slide3 from "../../../../assets/Home/Banner/3.png";
import slide4 from "../../../../assets/Home/Banner/4.png";
import slide5 from "../../../../assets/Home/Banner/5.png";
import slide6 from "../../../../assets/Home/Banner/6.png";
import bg1 from "../../../../assets/Home/Banner/bg-1.png";
import bg2 from "../../../../assets/Home/Banner/bg-2.png";

const sliderContent = [
  {
    title: "Forge Your Strength",
    description:
      "Push your limits and build a body that's as strong as your willpower. FitForge is your ultimate destination for fitness and transformation.",
    buttonText: "Start Your Journey",
    imgSrc: slide1,
  },
  {
    title: "Unite in Fitness",
    description:
      "Join a community of fitness enthusiasts! Share your journey, inspire others, and stay motivated as you work toward your goals.",
    buttonText: "Join the Community",
    imgSrc: slide2,
  },
  {
    title: "Unlock Your Potential",
    description:
      "Achieve your fitness goals with tailored workouts, expert coaching, and state-of-the-art equipment. Take your fitness to the next level.",
    buttonText: "Explore Our Programs",
    imgSrc: slide3,
  },
  {
    title: "Your Fitness, Your Way",
    description:
      "From personalized training to group classes, FitForge offers flexibility and variety to meet all your fitness needs.",
    buttonText: "Browse Classes",
    imgSrc: slide4,
  },
  {
    title: "Empower Your Body, Elevate Your Mind",
    description:
      "Fitness is about more than just physical strength. At FitForge, we nurture both your body and mind for complete wellness.",
    buttonText: "Learn More",
    imgSrc: slide5,
  },
  {
    title: "Celebrate Your Progress",
    description:
      "Every milestone counts. Celebrate your fitness journey with us at FitForge, where every achievement is recognized and celebrated.",
    buttonText: "Track Your Progress",
    imgSrc: slide6,
  },
];

const Banner = () => {
  return (
    <div className="container mx-auto py-20">
      <Carousel
        className="relative mx-auto"
        infiniteLoop
        autoPlay={{
          interval: 2000,
          pauseOnHover: false,
        }}
        interval={2000}
        showStatus={false}
        showThumbs={false}
      >
        {sliderContent.map((slide, index) => (
          <div key={index}>
            <img src={slide.imgSrc} alt="slide" />
            <img src={bg1} className="absolute left-0 top-0" alt="" />
            <img src={bg2} className="absolute left-0 top-0" alt="" />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black flex flex-col justify-center items-center text-primary text-center p-4">
              <h1 className="text-3xl font-bold">{slide.title}</h1>
              <p>{slide.description}</p>
              <button className="bg-primary text-white px-4 py-2 mt-4 rounded-md">
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
