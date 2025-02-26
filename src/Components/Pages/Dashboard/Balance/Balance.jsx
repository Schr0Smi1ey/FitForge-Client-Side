import React, { useContext } from "react";
import { AuthContext } from "../../../../Contexts/AuthContext/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { GridLoader } from "react-spinners";
import useCustomAxios from "../../../../Hooks/useCustomAxios";
import { PieChart } from "@mui/x-charts";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { Helmet } from "react-helmet";

const Balance = () => {
  const { user, loading } = useContext(AuthContext);
  const secureAxios = useAxiosSecure();

  const { data: paymentData, isFetching } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const res = await secureAxios.get("/payments", {
        params: { email: user.email },
      });
      return res.data;
    },
  });

  const { data: subscribersData, isFetching: isFetchingSubscribers } = useQuery(
    {
      queryKey: ["subscribers"],
      queryFn: async () => {
        const res = await secureAxios.get("/subscribers", {
          params: { email: user.email },
        });
        return res.data;
      },
      enabled: user === null ? false : true,
    }
  );

  if (loading || isFetching || isFetchingSubscribers) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <GridLoader color="#A94A4A" size={30} />
      </div>
    );
  }

  const payments = paymentData?.payments || [];
  const totalPaidMembers = paymentData?.totalPaidMembers || 0;
  const totalBalance = paymentData?.totalBalance || 0;
  const totalSubscribers = subscribersData?.totalSubscribers || 0;
  return (
    <div className="p-6">
      <Helmet>
        <title>FitForge | Dashboard | Balance</title>
      </Helmet>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-3xl font-bold mb-6 text-center">
          💰 Payment Balance $ {totalBalance}
        </h2>

        {/* Pie Chart Section */}
        <div className="flex flex-col items-center mb-6">
          <h3 className="text-xl font-semibold mb-2">📊 Membership Overview</h3>
          <PieChart
            skipAnimation={true}
            series={[
              {
                data: [
                  { id: 0, value: totalPaidMembers, label: "Paid Members" },
                  {
                    id: 1,
                    value: totalSubscribers,
                    label: "Subscribers",
                  },
                ],
                highlightScope: { fade: "global", highlight: "item" },
                faded: {
                  innerRadius: 30,
                  additionalRadius: -30,
                  color: "gray",
                },
              },
            ]}
            width={500}
            height={250}
          />
        </div>
      </div>

      {/* Payment Table Section */}
      {payments.length === 0 ? (
        <p className="text-gray-500 text-center">No transactions found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full border border-gray-300 shadow-lg">
            {/* Table Header */}
            <thead>
              <tr className="bg-gray-100 text-left text-gray-700">
                <th className="p-3 border">Trainer</th>
                <th className="p-3 border">Trainee</th>
                <th className="p-3 border">Class</th>
                <th className="p-3 border">Slot</th>
                <th className="p-3 border">Package</th>
                <th className="p-3 border">Price ($)</th>
                <th className="p-3 border">Date</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {payments.map((payment) => (
                <tr key={payment._id} className="hover:bg-gray-50">
                  <td className="p-3 border">
                    <div className="flex items-center gap-3">
                      <img
                        src={payment.trainerDetails.profileImage}
                        alt={payment.trainerDetails.fullName}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <span>{payment.trainerDetails.fullName}</span>
                    </div>
                  </td>
                  <td className="p-3 border">{user.displayName || "N/A"}</td>
                  <td className="p-3 border">{payment.classDetails.title}</td>
                  <td className="p-3 border">
                    {payment.slotDetails.slotName} (
                    {payment.slotDetails.selectedDay})
                  </td>
                  <td className="p-3 border">{payment.packageName}</td>
                  <td className="p-3 border font-semibold">${payment.price}</td>
                  <td className="p-3 border text-gray-500">
                    {new Date(payment.date).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Balance;
