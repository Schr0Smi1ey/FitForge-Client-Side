import React, { useState } from "react";
import { FaStar, FaUsers, FaPlay } from "react-icons/fa";

const ClassCard = ({ classData }) => {
  const {
    title,
    description,
    video_link,
    trainers,
    intensity,
    rating,
    booked,
  } = classData;

  const [isModalOpen, setModalOpen] = useState(false);

  const videoId = video_link.split("v=")[1]?.split("&")[0];
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  return (
    <>
      {/* Card */}
      <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col hover:shadow-xl transition duration-300">
        <div
          className="relative cursor-pointer"
          onClick={() => setModalOpen(true)}
        >
          <img
            src={thumbnailUrl}
            alt={title}
            className="w-full h-48 rounded-lg object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
            <FaPlay className="text-primary text-4xl opacity-90" />
          </div>
        </div>

        <div className="mt-4">
          <h3 className="text-xl font-bold text-gray-900">{title}</h3>
          <p className="text-gray-600 text-sm mt-2">{description}</p>
        </div>

        <div className="mt-4 flex items-center gap-2">
          {trainers.slice(0, 5).map((trainer, index) => (
            <img
              key={index}
              src={trainer.image}
              alt={`Trainer ${index + 1}`}
              className="w-10 h-10 rounded-full border-2 border-primary"
            />
          ))}
        </div>

        <div className="flex justify-between items-center mt-4 text-sm">
          <span
            className={`px-3 py-1 rounded-full text-white font-semibold ${
              intensity === "High"
                ? "bg-red-500"
                : intensity === "Moderate"
                ? "bg-yellow-500"
                : "bg-green-500"
            }`}
          >
            {intensity}
          </span>
          <div className="flex items-center text-gray-600">
            <FaStar className="text-yellow-500 mr-1" /> {rating.toFixed(1)}
          </div>
          <div className="flex items-center text-gray-600">
            <FaUsers className="mr-1" /> {booked} booked
          </div>
        </div>

        <button className="mt-6 bg-primary text-white py-2 px-4 rounded-lg font-semibold hover:bg-opacity-80 transition duration-300">
          Book Now
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg relative w-full max-w-2xl">
            <button
              className="absolute top-0 right-0 font-extrabold text-red-600 hover:text-red-900 text-xl"
              onClick={() => setModalOpen(false)}
            >
              ✕
            </button>
            <iframe
              className="w-full h-64 md:h-96 rounded-lg"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
              title={title}
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </>
  );
};

export default ClassCard;
