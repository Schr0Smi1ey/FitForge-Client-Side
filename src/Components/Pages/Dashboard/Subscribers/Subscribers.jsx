import { useQuery } from "@tanstack/react-query";
import useCustomAxios from "../../../../Hooks/useCustomAxios";
import { useState } from "react";

const Subscribers = () => {
  const customAxios = useCustomAxios();
  const [subscribers, setSubscribers] = useState([]);
  const { data: subscriberData = [] } = useQuery({
    queryKey: ["subscribers"],
    queryFn: async () => {
      const res = await customAxios.get("/subscribers");
      setSubscribers(res.data.result);
      return res.data;
    },
  });
  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra">
        <thead>
          <tr className="text-center">
            <th>No.</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {subscribers.map((subscriber, index) => (
            <tr key={subscriber._id} className="text-center">
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
