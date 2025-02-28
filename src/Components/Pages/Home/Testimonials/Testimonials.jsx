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
    <div className="bg-primary my-10">
      <div className="container mx-auto text-white py-16 px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Left Side - Text Content */}
        <div className="md:w-[45%] text-left space-y-6">
          <div className="relative">
            <FaQuoteLeft className="text-6xl text-white/60 absolute -top-10 -left-10" />
          </div>
          <h2 className="text-2xl md:text-3xl mt-2 lg:text-4xl font-extrabold leading-tight">
            The Power of Words from Those Who Matter”
          </h2>
          <p className="text-lg text-white/80">
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
        <div className="relative md:w-[50%]">
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
            {testimonials.map((item, index) => (
              <SwiperSlide key={index} className="max-w-sm">
                <div className="bg-white text-gray-800 p-6 py-8 rounded-2xl shadow-lg mx-auto text-center transition-all duration-300 hover:shadow-xl">
                  <Rating
                    initialRating={item.rating}
                    emptySymbol={
                      <FaRegStar className="text-gray-400 text-lg" />
                    }
                    fullSymbol={<FaStar className="text-yellow-500 text-lg" />}
                    readonly
                  />
                  <p className="mb-4 text-lg italic">"{item.text}"</p>
                  <div className="flex items-center justify-center gap-4 pt-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-14 rounded-full border-2 border-primary object-cover shadow-md"
                    />
                    <div>
                      <p className="font-bold text-gray-900">{item.name}</p>
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
