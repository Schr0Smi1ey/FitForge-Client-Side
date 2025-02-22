import { useQuery } from "@tanstack/react-query";
import React from "react";
import useCustomAxios from "../../../../Hooks/useCustomAxios";
import { Link } from "react-router-dom";

const Applications = () => {
  const customAxios = useCustomAxios();
  const { data: appliedTrainers = [] } = useQuery({
    queryKey: ["appliedTrainers"],
    queryFn: async () => {
      const res = await customAxios.get("/appliedTrainers");
      return res.data;
    },
  });
  return (
    <div>
      <table className="table table-zebra">
        <thead>
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {appliedTrainers.map((applicant, index) => (
            <tr key={applicant._id}>
              <td>{index + 1}</td>
              <td>{applicant.user.name}</td>
              <td>{applicant.user.email}</td>
              <td>{applicant.status}</td>
              <td>
                <Link
                  // to={`applicant-details/${applicant.trainer._id}`}
                  to={`/dashboard/applicant-details/${applicant.trainer._id}`}
                  className="bg-primary p-2 rounded-full text-white"
                >
                  Details
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Applications;
