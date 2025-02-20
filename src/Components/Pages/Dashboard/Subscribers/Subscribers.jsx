import { useQuery } from "@tanstack/react-query";
import useCustomAxios from "../../../../Hooks/useCustomAxios";

const Subscribers = () => {
  const customAxios = useCustomAxios();
  const { data: subscribers = [] } = useQuery({
    queryKey: ["subscribers"],
    queryFn: async () => {
      const res = await customAxios.get("/subscribers");
      return res.data;
    },
  });
  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra">
        <thead>
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {subscribers.map((subscriber, index) => (
            <tr key={subscriber._id}>
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
