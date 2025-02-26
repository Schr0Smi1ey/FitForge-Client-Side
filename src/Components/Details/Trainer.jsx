import {
  FaBriefcase,
  FaCalendarAlt,
  FaGlobe,
  FaGraduationCap,
  FaStar,
} from "react-icons/fa";
import { Link, useLoaderData } from "react-router-dom";

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

        <div className="mt-12">
          {/* Section Title */}
          <h2 className="text-2xl font-bold text-primary mb-6">
            Available Sessions
            <span className="ml-2 text-lg text-gray-500 dark:text-gray-400 font-normal">
              Choose your perfect time
            </span>
          </h2>

          <div className="mt-12 text-center">
            {/* Section Title */}
            <h2 className="text-2xl font-bold text-primary mb-6">
              Available Sessions
              <span className="block text-lg text-gray-500 dark:text-gray-400 font-normal">
                Choose your perfect time
              </span>
            </h2>

            {/* Table Container */}
            <div className="border rounded-2xl shadow-sm dark:border-gray-700 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-primary-50 dark:bg-gray-800">
                    <tr className="text-center">
                      <th className="px-6 py-4 text-primary font-semibold">
                        Day
                      </th>
                      <th className="px-6 py-4 text-primary font-semibold">
                        Session
                      </th>
                      <th className="px-6 py-4 text-primary font-semibold">
                        Duration
                      </th>
                      <th className="px-6 py-4 text-primary font-semibold">
                        Class
                      </th>
                      <th className="px-6 py-4 text-primary font-semibold">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {trainer.slots.map((slot) => (
                      <tr
                        key={slot._id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors text-center"
                      >
                        <td className="px-6 py-4 font-medium text-gray-700 dark:text-gray-300">
                          {slot.selectedDay}
                        </td>
                        <td className="px-6 py-4">
                          <span className="bg-primary-100 dark:bg-primary-900/30 text-primary px-3 py-1 rounded-full text-sm">
                            {slot.slotName}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                          {slot.slotTime}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex justify-center items-center gap-2">
                            <span className="w-2 h-2 bg-primary rounded-full"></span>
                            {slot.selectedClass}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <Link
                            to={`/book-trainer/${trainer._id}/${slot._id}`}
                          >
                            <button
                              className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg transition-all 
      focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                            >
                              <FaCalendarAlt className="w-5 h-5" />
                              <span>Book Now</span>
                            </button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* CTA Section */}
            <div className="mt-12 border-t pt-12">
              <div className="max-w-4xl mx-auto text-center">
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Ready to Transform Lives?
                  <span className="block text-primary mt-2">
                    Become a Trainer
                  </span>
                </h3>
                <Link
                  to="/become-a-trainer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold transition-all 
                     border-2 border-primary text-primary hover:bg-primary/10 dark:hover:bg-primary/20
                     rounded-[2rem] hover:shadow-lg"
                >
                  <FaGraduationCap className="w-6 h-6" />
                  Start Your Trainer Journey
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trainer;
