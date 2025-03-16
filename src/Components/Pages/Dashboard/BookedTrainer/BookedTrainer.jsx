import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../Contexts/AuthContext/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { GridLoader } from "react-spinners";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { Helmet } from "react-helmet";
import Aos from "aos";
import "aos/dist/aos.css";
import { Link, useNavigate } from "react-router-dom";
const BookedTrainer = () => {
  const { user, loading } = useContext(AuthContext);
  const [payments, setPayments] = useState([]);
  const secureAxios = useAxiosSecure();
  const navigate = useNavigate();
  useEffect(() => {
    Aos.init({ duration: 500 });
  }, []);
  const { data: paymentData = [], isFetching } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const res = await secureAxios.get("/booked-trainers", {
        params: { email: user.email },
      });
      setPayments(res.data.payments);
      return res.data;
    },
  });

  if (loading || isFetching) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <GridLoader color="#198068" size={40} />
      </div>
    );
  }

  return (
    <div className="p-6">
      <Helmet>
        <title>FitForge | Dashboard | Booked Trainers</title>
      </Helmet>
      <h2
        data-aos="fade-down"
        data-aos-delay="150"
        className="text-3xl text-center font-bold mb-6"
      >
        Booked Trainers
      </h2>

      {payments.length === 0 ? (
        <p
          data-aos="fade-up"
          data-aos-delay="150"
          className="text-2xl text-red-500 font-bold text-center"
        >
          No bookings found.
        </p>
      ) : (
        <div className="max-w-2xl mx-auto grid grid-cols-1 gap-6">
          {payments.map((payment) => (
            <div
              key={payment._id}
              className="bg-white dark:bg-black dark:border-2 dark:border-white/40 dark:p-1 shadow-lg rounded-2xl overflow-hidden transition-transform transform duration-300"
            >
              {/* Trainer Image */}
              <div className="relative">
                <img
                  data-aos="fade-up"
                  data-aos-delay="200"
                  src={payment.trainerDetails.profileImage}
                  alt={payment.trainerDetails.fullName}
                  className="w-[75%] rounded-3xl mx-auto object-cover"
                />
              </div>

              {/* Trainer Details */}
              <div className="p-5">
                <div className="flex flex-col md:flex-row gap-3 md:gap-4 lg:gap-8 justify-center items-center">
                  <div data-aos="fade-up" data-aos-delay="220">
                    <h3 className="text-2xl font-bold text-primary">
                      {payment.trainerDetails.fullName}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">
                      📧 {payment.trainerDetails.email}
                    </p>
                  </div>
                  <div data-aos="fade-up" data-aos-delay="240">
                    <p className="text-gray-700 dark:text-gray-400">
                      🎯 <span className="dark:text-gray-300">Age</span>:{" "}
                      {payment.trainerDetails.age}
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                      💰 Package:{" "}
                      <span className="text-primary font-bold">
                        {payment.packageName}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Class Details */}
                <div
                  data-aos="fade-up"
                  data-aos-delay="260"
                  className="mt-4 p-3 bg-gray-100 dark:bg-black dark:border-2 dark:border-white/40 rounded-xl"
                >
                  <h4 className="text-lg font-semibold text-primary">
                    🏋️ {payment.classDetails.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {payment.classDetails.description}
                  </p>
                  <p className="text-sm mt-2 font-bold text-gray-700 dark:text-gray-300">
                    🔥 Intensity:{" "}
                    <span className="font-medium text-primary">
                      {payment.classDetails.intensity}
                    </span>
                  </p>
                </div>

                {/* Slot Details */}
                <div
                  data-aos="fade-up"
                  data-aos-delay="280"
                  className="mt-4 p-3 border border-primary rounded-xl bg-gray-50 dark:bg-black dark:border-2 dark:border-white/40"
                >
                  <p className="text-gray-800 dark:text-gray-400 font-semibold">
                    🕒 Slot Details
                  </p>
                  <p className="text-primary font-medium">
                    ⏰ {payment.slotDetails.slotName}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    📅 {payment.slotDetails.selectedDay}
                  </p>
                </div>
              </div>
              {/* CTA button */}
              <button
                onClick={() =>
                  navigate(`/trainer-details/${payment.trainerDetails._id}`)
                }
                className="w-full bg-primary rounded-lg text-white py-2"
              >
                Know More!
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookedTrainer;
