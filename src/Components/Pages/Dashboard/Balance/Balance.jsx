import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../../../Contexts/AuthContext/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { GridLoader } from "react-spinners";
import { PieChart } from "@mui/x-charts";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { Helmet } from "react-helmet";
import Aos from "aos";
import "aos/dist/aos.css";
const Balance = () => {
  const { user, loading } = useContext(AuthContext);
  const secureAxios = useAxiosSecure();
  useEffect(() => {
    Aos.init({ duration: 500 });
  }, []);
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
        <GridLoader color="#198068" size={40} />
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
      <div className="mb-6 flex flex-col lg:flex-row items-center justify-between gap-6">
        {/* Payment Balance */}
        <h2
          data-aos="fade-right"
          className="text-2xl md:text-3xl font-bold text-center bg-primary text-white px-6 py-3 rounded-lg shadow-md"
        >
          💰 Payment Balance: $ {totalBalance}
        </h2>

        {/* Pie Chart Section */}
        <div
          data-aos="fade-left"
          className="bg-white dark:bg-black dark:text-white p-4 rounded-lg shadow-md w-full md:w-auto"
        >
          <h3 className="text-lg md:text-xl font-semibold text-center mb-4">
            📊 Membership Overview
          </h3>
          <PieChart
            skipAnimation={true}
            series={[
              {
                data: [
                  {
                    id: 0,
                    value: totalPaidMembers,
                    label: "Paid Members",
                  },
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
        <p
          data-aos="fade-up"
          className="text-2xl text-red-500 font-bold text-center"
        >
          No transactions found.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table
            data-aos="fade-up"
            className="table w-full border border-gray-300 shadow-lg"
          >
            {/* Table Header */}
            <thead className="bg-primary text-white text-base md:text-lg lg:text-xl">
              <tr className="text-center">
                <th
                  data-aos="fade-up"
                  data-aos-delay="100"
                  className="p-1 border"
                  colSpan={2}
                >
                  Trainer
                </th>
                <th
                  data-aos="fade-up"
                  data-aos-delay="100"
                  className="p-1 border"
                >
                  Trainee
                </th>
                <th
                  data-aos="fade-up"
                  data-aos-delay="100"
                  className="p-1 border"
                >
                  Class
                </th>
                <th
                  data-aos="fade-up"
                  data-aos-delay="100"
                  className="p-1 border"
                >
                  Slot
                </th>
                <th
                  data-aos="fade-up"
                  data-aos-delay="100"
                  className="p-1 border"
                >
                  Package
                </th>
                <th
                  data-aos="fade-up"
                  data-aos-delay="100"
                  className="p-1 border"
                >
                  Price ($)
                </th>
                <th
                  data-aos="fade-up"
                  data-aos-delay="100"
                  className="p-1 border"
                >
                  Date
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="text-gray-700 dark:text-gray-400 text-center text-sm">
              {payments.map((payment) => (
                <tr key={payment._id}>
                  <td
                    data-aos="fade-up"
                    data-aos-delay="250"
                    className="p-1 border"
                    colSpan={2}
                  >
                    <div className="flex items-center justify-center gap-3">
                      <img
                        src={payment.trainerDetails.profileImage}
                        alt={payment.trainerDetails.fullName}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <span>{payment.trainerDetails.fullName}</span>
                    </div>
                  </td>
                  <td
                    data-aos="fade-up"
                    data-aos-delay="250"
                    className="p-1 border"
                  >
                    {user.displayName || "N/A"}
                  </td>
                  <td
                    data-aos="fade-up"
                    data-aos-delay="250"
                    className="p-1 border"
                  >
                    {payment.classDetails.title}
                  </td>
                  <td
                    data-aos="fade-up"
                    data-aos-delay="250"
                    className="p-1 border"
                  >
                    {payment.slotDetails.slotName} (
                    {payment.slotDetails.selectedDay})
                  </td>
                  <td
                    data-aos="fade-up"
                    data-aos-delay="250"
                    className="p-1 border"
                  >
                    {payment.packageName}
                  </td>
                  <td
                    data-aos="fade-up"
                    data-aos-delay="250"
                    className="p-1 border font-semibold"
                  >
                    ${payment.price}
                  </td>
                  <td
                    data-aos="fade-up"
                    data-aos-delay="250"
                    className="p-1 border text-gray-500"
                  >
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
