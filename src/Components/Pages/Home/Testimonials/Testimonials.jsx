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

const testimonials = [
  {
    text: "Vestibulum pellentesque vulputate dui, sed accumsan enim. Quisque vitae risus quis arcu lobortis varius sed vitae mi.",
    name: "Lisa Joy",
    role: "Founder, Some Company",
    rating: 3.5,
    image: userImg,
  },
  {
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam fermentum augue id libero aliquet, sed consequat.",
    name: "John Doe",
    role: "CEO, Tech Inc.",
    rating: 4.2,
    image: userImg,
  },
];

const Testimonials = () => {
  return (
    <div className="bg-primary">
      <div className="container mx-auto text-white py-16 px-8 flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-[40%] text-left mb-12 md:mb-0 space-y-6">
          <div className="relative inline-block">
            <FaQuoteLeft className="text-6xl text-white opacity-50" />
          </div>

          <h2 className="text-4xl font-extrabold leading-tight">
            “The Power of Words from Those Who Matter”
          </h2>

          <p className="text-lg text-gray-200">
            Real voices, real experiences—our clients’ words hold the true
            essence of what we do. Dive into their stories and see why we stand
            out.
          </p>

          {/* CTA Button */}
          <button className="mt-4 text-white border-b-2 border-white pb-1 hover:opacity-80 transition duration-300 text-lg font-medium">
            READ ALL REVIEWS
          </button>
        </div>

        {/* Right Side - Swiper Carousel */}
        <div className="relative md:w-1/2">
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={"auto"}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            navigation={true}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            pagination={{ clickable: true }}
            modules={[Autoplay, EffectCoverflow, Pagination, Navigation]}
          >
            {testimonials.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="bg-white text-gray-800 p-6 py-8 rounded-lg shadow-lg max-w-md mx-auto text-center">
                  <Rating
                    initialRating={item.rating}
                    emptySymbol={
                      <FaRegStar className="text-gray-400 text-lg" />
                    }
                    fullSymbol={<FaStar className="text-yellow-500 text-lg" />}
                    readonly
                  />
                  <p className="mb-4 text-lg">{item.text}</p>
                  <div className="flex items-center justify-center gap-4 py-2">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-bold">{item.name}</p>
                      <p className="text-sm text-gray-500">{item.role}</p>
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
