import React, { useContext, useState } from "react";
import { AuthContext } from "../../../../Contexts/AuthContext/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { GridLoader } from "react-spinners";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { Helmet } from "react-helmet";

const BookedTrainer = () => {
  const { user, loading } = useContext(AuthContext);
  const [payments, setPayments] = useState([]);
  const secureAxios = useAxiosSecure();

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
        <GridLoader color="#A94A4A" size={40} />
      </div>
    );
  }

  return (
    <div className="p-6">
      <Helmet>
        <title>FitForge | Dashboard | Booked Trainers</title>
      </Helmet>
      <h2 className="text-3xl text-center font-bold mb-6">Booked Trainers</h2>

      {payments.length === 0 ? (
        <p className="text-gray-500">No bookings found.</p>
      ) : (
        <div className="max-w-2xl mx-auto grid grid-cols-1 gap-6">
          {payments.map((payment) => (
            <div
              key={payment._id}
              className="bg-white shadow-lg rounded-2xl overflow-hidden transition-transform transform hover:scale-105 duration-300"
            >
              {/* Trainer Image */}
              <div className="relative">
                <img
                  src={payment.trainerDetails.profileImage}
                  alt={payment.trainerDetails.fullName}
                  className="w-[75%] rounded-3xl mx-auto object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white text-lg font-semibold">
                    {payment.trainerDetails.fullName}
                  </p>
                </div>
              </div>

              {/* Trainer Details */}
              <div className="p-5">
                <div className="flex flex-col md:flex-row gap-3 md:gap-4 lg:gap-8 justify-center items-center">
                  <div>
                    <h3 className="text-2xl font-bold text-primary">
                      {payment.trainerDetails.fullName}
                    </h3>
                    <p className="text-gray-500 text-sm mb-2">
                      📧 {payment.trainerDetails.email}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-700">
                      🎯 Age: {payment.trainerDetails.age}
                    </p>
                    <p className="text-gray-700">
                      💰 Package: {payment.packageName}
                    </p>
                  </div>
                </div>

                {/* Class Details */}
                <div className="mt-4 p-3 bg-gray-100 rounded-xl">
                  <h4 className="text-lg font-semibold text-primary">
                    🏋️ {payment.classDetails.title}
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {payment.classDetails.description}
                  </p>
                  <p className="text-sm text-gray-600">
                    🔥 Intensity:{" "}
                    <span className="font-semibold">
                      {payment.classDetails.intensity}
                    </span>
                  </p>
                </div>

                {/* Slot Details */}
                <div className="mt-4 p-3 border border-primary rounded-xl bg-gray-50">
                  <p className="text-gray-800 font-semibold">🕒 Slot Details</p>
                  <p className="text-gray-600">
                    ⏰ {payment.slotDetails.slotName}
                  </p>
                  <p className="text-gray-600">
                    📅 {payment.slotDetails.selectedDay}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookedTrainer;
