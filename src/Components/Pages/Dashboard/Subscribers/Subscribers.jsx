import { useQuery } from "@tanstack/react-query";
import useCustomAxios from "../../../../Hooks/useCustomAxios";
import { useContext, useState } from "react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { AuthContext } from "../../../../Contexts/AuthContext/AuthProvider";
import { GridLoader } from "react-spinners";
import { Helmet } from "react-helmet";

const Subscribers = () => {
  const secureAxios = useAxiosSecure();
  const [subscribers, setSubscribers] = useState([]);
  const { user, loading } = useContext(AuthContext);
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
        <GridLoader color="#A94A4A" size={30} />
      </div>
    );
  }
  return (
    <div className="overflow-x-auto">
      <Helmet>
        <title>FitForge | Dashboard | Subscribers</title>
      </Helmet>
      <table className="table table-zebra">
        <thead className="bg-primary text-white">
          <tr className="text-center text-base md:text-lg lg:text-xl">
            <th>No.</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {subscribers.map((subscriber, index) => (
            <tr
              key={subscriber._id}
              className="text-center text-base md:text-lg lg:text-xl"
            >
              <td>{index + 1}</td>
              <td>{subscriber.name}</td>
              <td>{subscriber.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Subscribers;
