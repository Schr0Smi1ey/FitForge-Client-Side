import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import Rating from "react-rating";
import {
  Autoplay,
  Pagination,
  Navigation,
  EffectCoverflow,
} from "swiper/modules";
import { FaQuoteLeft, FaRegStar, FaStar } from "react-icons/fa";
import userImg from "../../../../assets/Home/Testimonials/commenter1.jpg";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { GridLoader } from "react-spinners";

const Testimonials = () => {
  useEffect(() => {
    Aos.init({ duration: 500 });
  }, []);
  const secureAxios = useAxiosSecure();
  const { data: reviews = [], isFetching } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await secureAxios.get("/reviews");
      return res.data;
    },
  });
  if (isFetching) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <GridLoader color="#198068" size={40} />
      </div>
    );
  }
  return (
    <div className="bg-primary pb-8 pt-14 rounded-md px-6 md:px-12 lg:px-20 mt-10">
      <div className="container mx-auto text-white flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Left Side - Text Content */}
        <div data-aos="fade-right" className="md:w-[45%] text-left space-y-6">
          <div className="relative">
            <FaQuoteLeft className="text-4xl lg:text-6xl text-white/60 absolute -top-5 sm:-top-8 sm:-left-10" />
          </div>
          <h2 className="flex text-2xl ml-3 md:text-3xl lg:mt-2 lg:text-4xl font-extrabold leading-tight">
            The Power of Words from Those Who Matter
          </h2>
          <p className="text-lg text-white/80">
            Real voices, real experiences—our clients’ words hold the true
            essence of what we do. Dive into their stories and see why we stand
            out.
          </p>
          <div className="border-white border-b-4"></div>
        </div>

        {/* Right Side - Swiper Carousel */}
        <div data-aos="fade-left" className="relative md:w-[50%]">
          <Swiper
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView="auto"
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{ clickable: true }}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            modules={[Autoplay, EffectCoverflow, Pagination, Navigation]}
            className="max-w-md md:max-w-lg lg:max-w-xl"
          >
            {reviews.map((item, index) => (
              <SwiperSlide key={index} className="max-w-sm">
                <div className="bg-white dark:bg-black dark:text-white text-gray-800 p-6 py-8 rounded-2xl shadow-lg mx-auto text-center transition-all duration-300 hover:shadow-xl">
                  <Rating
                    initialRating={item.rating}
                    emptySymbol={
                      <FaRegStar className="text-gray-400 text-lg" />
                    }
                    fullSymbol={<FaStar className="text-yellow-500 text-lg" />}
                    readonly
                  />
                  <p className="mb-4 text-lg italic">"{item.feedback}"</p>
                  <div className="flex items-center justify-center gap-4 pt-4">
                    <img
                      src={item.userData[0].photo}
                      alt={item.userData[0].name}
                      className="w-14 h-14 rounded-full border-2 border-primary object-cover shadow-md"
                    />
                    <div>
                      <p className="font-bold text-gray-900 dark:text-gray-300">
                        {item.userData[0].name}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                        {item.userData[0].role} | FitForge
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
