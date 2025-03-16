import { FaFacebookF, FaTwitter, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
const TrainerCard = ({ trainer }) => {
  useEffect(() => {
    Aos.init({ duration: 500 });
  }, []);
  return (
    <div className="bg-white dark:bg-black dark:text-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      {/* Image Section */}
      <div className="relative group">
        <img
          data-aos="fade-down"
          src={trainer.profileImage}
          alt={trainer.fullName}
          className="w-full h-72 object-cover transition-transform duration-300"
        />
        {/* Overlay on Hover */}
        <div className="absolute inset-0 bg-primary/60 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <a
            href={trainer.socialLinks[0]}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebookF className="text-white text-3xl hover:scale-110 transition-transform" />
          </a>
          <a
            href={trainer.socialLinks[1]}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter className="text-white text-3xl hover:scale-110 transition-transform" />
          </a>
          <a
            href={trainer.socialLinks[2]}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin className="text-white text-3xl hover:scale-110 transition-transform" />
          </a>
        </div>
      </div>

      {/* Info Section */}
      <div className="p-5 text-center">
        <h3
          data-aos="fade-up"
          className="text-xl font-bold text-gray-800 dark:text-white"
        >
          {trainer.fullName}
        </h3>
        <p data-aos="fade-up" className="text-base text-primary font-medium">
          {trainer.experience} years experience
        </p>

        {/* Skills */}
        <div className="flex flex-wrap justify-center gap-2 my-3">
          {trainer.skills.slice(0, 3).map((skill, index) => (
            <span
              data-aos="fade-right"
              key={index}
              className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* Availability */}
        <div
          data-aos="fade-up"
          className="text-base text-gray-600 dark:text-white"
        >
          <span className="font-semibold">Available:</span>{" "}
          {trainer.availableDays.join(", ")}
        </div>
        <div
          data-aos="fade-up"
          className="text-base text-green-700 font-medium mt-1"
        >
          {trainer.availableTime}
        </div>
      </div>

      {/* CTA Button */}
      <Link data-aos="fade-up" to={`/trainer-details/${trainer._id}`}>
        <button className="w-full bg-gradient-to-r from-[#3D8D7A] to-primary text-white py-3 font-semibold text-lg tracking-wide hover:brightness-110 transition-all duration-300 hover:shadow-md">
          Know More
        </button>
      </Link>
    </div>
  );
};

export default TrainerCard;
