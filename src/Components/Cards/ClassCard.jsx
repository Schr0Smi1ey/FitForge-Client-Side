import { FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const ClassCard = ({ classData }) => {
  const { title, description, image, trainerDetails, intensity, booked } =
    classData;
  const colors = {
    beginner: "bg-green-500",
    intermediate: "bg-yellow-500",
    advanced: "bg-red-500",
  };

  useEffect(() => {
    AOS.init({ duration: 500 });
  }, []);

  return (
    <div className="bg-white dark:bg-black dark:border-white/15 dark:border-2 shadow-lg rounded-xl p-3 md:p-4 flex flex-col hover:shadow-2xl transition duration-300">
      {/* Image */}
      <div data-aos="fade-down" className="relative">
        <img
          src={image}
          alt={title}
          className="w-full h-60 hover:scale-105 rounded-xl object-cover"
        />
      </div>

      {/* Class Info */}
      <div className="mt-4">
        <h3
          data-aos="fade-right"
          className="text-xl font-bold text-gray-900 dark:text-white"
        >
          {title}
        </h3>
        <p
          data-aos="fade-left"
          className="text-gray-600 dark:text-gray-400 text-sm mt-2 line-clamp-3"
        >
          {description}
        </p>
      </div>

      {/* Trainers */}
      <div className="mt-4 flex -space-x-2">
        {trainerDetails.length > 0 ? (
          trainerDetails.map((trainer, index) => (
            <Link to={`/trainer-details/${trainer._id}`} key={index}>
              <img
                data-aos="fade-right"
                src={trainer.profileImage || "https://via.placeholder.com/50"}
                alt={`Trainer ${index + 1}`}
                className="w-10 h-10 rounded-full border-2 border-primary"
              />
            </Link>
          ))
        ) : (
          <p
            data-aos="fade-right"
            className="text-gray-500 dark:text-gray-400 text-sm"
          >
            No trainers assigned
          </p>
        )}
      </div>

      {/* Class Details */}
      <div className="flex justify-between items-center mt-4 text-sm">
        {/* Intensity Badge */}
        <span
          data-aos="fade-up"
          className={`px-3 py-1 rounded-full text-white font-semibold ${
            colors[intensity.toLowerCase()]
          } `}
        >
          {intensity}
        </span>

        {/* Bookings Count */}
        <div
          data-aos="fade-up"
          className="flex items-center text-black dark:text-white"
        >
          <FaUsers className="mr-1" /> {booked} booked
        </div>
      </div>
    </div>
  );
};

export default ClassCard;
