import { FaCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
const TrainerCard = ({ trainer }) => {
  console.log(trainer);
  return (
    <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
      <div className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <img
            src={trainer.profileImage}
            alt={trainer.fullName}
            className="w-20 h-20 rounded-full border-4 border-purple-100 object-cover"
          />
          <div>
            <h3 className="text-xl font-bold text-gray-800">
              {trainer.fullName}
            </h3>
            <p className="text-sm text-purple-600 font-medium">
              {trainer.experience} years experience
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {trainer?.skills.slice(0, 3).map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-purple-50 text-purple-700 text-sm rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-gray-600">
            <FaCalendarAlt className="w-5 h-5 text-purple-500" />
            <span>{trainer.availableDays.join(", ")}</span>
          </div>
          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
            {trainer.availableTime}
          </span>
        </div>
      </div>

      <Link to={`/trainer-details/${trainer._id}`}>
        <button className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 font-medium hover:opacity-90 transition-opacity">
          Know More
        </button>
      </Link>
    </div>
  );
};

export default TrainerCard;
