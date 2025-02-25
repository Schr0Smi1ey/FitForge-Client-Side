import { useQuery } from "@tanstack/react-query";
import React from "react";
import useCustomAxios from "../../../../Hooks/useCustomAxios";
import { Link } from "react-router-dom";
import { GridLoader } from "react-spinners";

const Applications = () => {
  const customAxios = useCustomAxios();
  const { data: appliedTrainers = [], isLoading } = useQuery({
    queryKey: ["appliedTrainers"],
    queryFn: async () => {
      const res = await customAxios.get("/appliedTrainers");
      return res.data;
    },
  });
  console.log(appliedTrainers);
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <GridLoader color="#A94A4A" size={30} />
      </div>
    );
  }
  console.log(appliedTrainers);
  return (
    <>
      {appliedTrainers.length === 0 ? (
        <div>
          <p>No Application Found!</p>
        </div>
      ) : (
        <div>
          <table className="table table-zebra">
            <thead>
              <tr className="text-center">
                <th>No.</th>
                <th>Name</th>
                <th>Email</th>
                <th>Apply Date</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {appliedTrainers.map((applicant, index) => (
                <tr key={applicant._id} className="text-center">
                  <td>{index + 1}</td>
                  <td>{applicant.user.name}</td>
                  <td>{applicant.user.email}</td>
                  <td>{applicant.trainer.applyDate}</td>
                  <td>
                    <Link
                      to={`/dashboard/trainer-details/${applicant.trainer._id}`}
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
      )}
    </>
  );
};

export default Applications;
