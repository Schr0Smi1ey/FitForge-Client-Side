import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { AuthContext } from "../../../../Contexts/AuthContext/AuthProvider";
import { GridLoader } from "react-spinners";
import { Helmet } from "react-helmet";
import Aos from "aos";
import "aos/dist/aos.css";
const Subscribers = () => {
  const secureAxios = useAxiosSecure();
  const [subscribers, setSubscribers] = useState([]);
  const { user, loading } = useContext(AuthContext);
  useEffect(() => {
    Aos.init({ duration: 500 });
  }, []);
  const { data: subscriberData = [], isFetching } = useQuery({
    queryKey: ["subscribers"],
    queryFn: async () => {
      const res = await secureAxios.get("/subscribers", {
        params: { email: user.email },
      });
      setSubscribers(res.data.result);
      return res.data;
    },
    enabled: user === null ? false : true,
  });
  if (loading || isFetching) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <GridLoader color="#198068" size={40} />
      </div>
    );
  }
  return (
    <div className="overflow-x-auto">
      <Helmet>
        <title>FitForge | Dashboard | Subscribers</title>
      </Helmet>
      <div className="mb-6">
        <h1
          data-aos="fade-down"
          className="text-2xl md:text-3xl font-bold text-gray-800 text-center"
        >
          📋 Subscriber List
        </h1>
      </div>

      {subscribers.length === 0 ? (
        <div data-aos="fade-down" className="text-center">
          <p className="text-2xl text-red-500 font-bold text-center">
            No subscribers found!
          </p>
        </div>
      ) : (
        <table className="table table-zebra">
          <thead className="bg-primary text-white">
            <tr className="text-center text-base md:text-lg lg:text-xl">
              <th data-aos="fade-down">No.</th>
              <th data-aos="fade-down">Name</th>
              <th data-aos="fade-down">Email</th>
            </tr>
          </thead>
          <tbody>
            {subscribers.map((subscriber, index) => (
              <tr
                key={subscriber._id}
                className="text-center text-base md:text-lg lg:text-xl"
              >
                <td data-aos="fade-up">{index + 1}</td>
                <td data-aos="fade-up">{subscriber.name}</td>
                <td data-aos="fade-up">{subscriber.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Subscribers;
