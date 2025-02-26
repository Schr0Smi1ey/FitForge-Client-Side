import React, { useContext, useState } from "react";
import { AuthContext } from "../../../../Contexts/AuthContext/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { GridLoader } from "react-spinners";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

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
        <GridLoader color="#A94A4A" size={30} />
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Booked Trainers</h2>

      {payments.length === 0 ? (
        <p className="text-gray-500">No bookings found.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {payments.map((payment) => (
            <div
              key={payment._id}
              className="card bg-white shadow-xl rounded-lg p-4"
            >
              {/* Trainer Image */}
              <img
                src={payment.trainerDetails.profileImage}
                alt={payment.trainerDetails.fullName}
                className="w-full h-40 object-cover rounded-lg"
              />

              {/* Trainer Details */}
              <div className="mt-4">
                <h3 className="text-xl font-semibold">
                  {payment.trainerDetails.fullName}
                </h3>
                <p className="text-gray-600">
                  📧 {payment.trainerDetails.email}
                </p>
                <p className="text-gray-600">
                  🎯 Age: {payment.trainerDetails.age}
                </p>
                <p className="text-gray-600">
                  💰 Package: {payment.packageName}
                </p>

                {/* Class Details */}
                <div className="mt-4">
                  <h4 className="font-bold text-lg">
                    🏋️ {payment.classDetails.title}
                  </h4>
                  <p className="text-gray-600">
                    {payment.classDetails.description}
                  </p>
                  <p className="text-gray-500">
                    🔥 Intensity: {payment.classDetails.intensity}
                  </p>
                </div>

                {/* Slot Details */}
                <div className="mt-4 p-3 bg-gray-100 rounded-lg">
                  <p className="text-gray-700 font-semibold">🕒 Slot Details</p>
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
