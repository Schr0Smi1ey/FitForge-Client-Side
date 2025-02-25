import { FaUsers } from "react-icons/fa";

const ClassCard = ({ classData }) => {
  const { title, description, image, trainers, intensity, booked } = classData;
  const colors = {
    beginner: "bg-green-500",
    intermediate: "bg-yellow-500",
    advanced: "bg-red-500",
  };
  return (
    <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col hover:shadow-2xl transition duration-300">
      {/* Image */}
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="w-full h-60 rounded-xl object-cover"
        />
      </div>

      {/* Class Info */}
      <div className="mt-4">
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        <p className="text-gray-600 text-sm mt-2 line-clamp-3">{description}</p>
      </div>

      {/* Trainers */}
      <div className="mt-4 flex -space-x-2">
        {trainers.length > 0 ? (
          trainers
            .slice(0, 5)
            .map((trainer, index) => (
              <img
                key={index}
                src={trainer.image || "https://via.placeholder.com/50"}
                alt={`Trainer ${index + 1}`}
                className="w-10 h-10 rounded-full border-2 border-primary"
              />
            ))
        ) : (
          <p className="text-gray-500 text-sm">No trainers assigned</p>
        )}
      </div>

      {/* Class Details */}
      <div className="flex justify-between items-center mt-4 text-sm">
        {/* Intensity Badge */}
        <span
          className={`px-3 py-1 rounded-full text-white font-semibold ${
            colors[intensity.toLowerCase()]
          } `}
        >
          {intensity}
        </span>

        {/* Bookings Count */}
        <div className="flex items-center text-gray-600">
          <FaUsers className="mr-1 text-gray-500" /> {booked} booked
        </div>
      </div>

      {/* Book Now Button */}
      <button
        disabled={trainers.length === 0}
        className="mt-6 bg-primary text-white py-2 px-4 rounded-lg font-semibold hover:bg-opacity-80 transition duration-300"
      >
        Book Now
      </button>
    </div>
  );
};

export default ClassCard;
