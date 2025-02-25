import { FaBriefcase, FaGlobe, FaStar } from "react-icons/fa";
import { useLoaderData } from "react-router-dom";

const Trainer = () => {
  const trainer = useLoaderData().trainer;
  console.log(trainer);
  return (
    <div className="max-w-6xl pt-32 mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row gap-8 mb-8">
          <img
            src={trainer.profileImage}
            alt={trainer.fullName}
            className="w-32 h-32 rounded-full border-4 border-purple-100 object-cover"
          />
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {trainer.fullName}
            </h1>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-2 text-purple-600">
                <FaBriefcase className="w-5 h-5" />
                <span>{trainer.experience} years experience</span>
              </div>
              <div className="flex items-center gap-1 text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
            </div>
            <div className="flex gap-3">
              {trainer.socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-100 rounded-lg hover:bg-purple-100 transition-colors"
                >
                  <FaGlobe className="w-6 h-6 text-gray-600" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Biography
            </h2>
            <p className="text-gray-600 leading-relaxed">{trainer.biography}</p>
          </div>

          <div>
            <div className="bg-purple-50 rounded-xl p-6 mb-6">
              <h3 className="font-semibold text-gray-800 mb-3">Availability</h3>
              <div className="flex flex-wrap gap-2">
                {trainer.availableDays.map((day, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-white text-purple-700 rounded-full text-sm shadow-sm"
                  >
                    {day} ({trainer.availableTime})
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-green-50 rounded-xl p-6">
              <h3 className="font-semibold text-gray-800 mb-3">
                Specializations
              </h3>
              <div className="flex flex-wrap gap-2">
                {trainer.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-white text-green-700 rounded-full text-sm shadow-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Session Slots */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Available Sessions
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {trainer.slot.map((time, index) => (
              <button
                key={index}
                className="p-3 bg-white border-2 border-purple-100 rounded-lg hover:border-purple-300 transition-colors text-center"
              >
                <span className="block text-gray-800 font-medium">{time}</span>
                <span className="text-sm text-purple-600">1 hour session</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trainer;
