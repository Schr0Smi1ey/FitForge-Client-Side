import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import useCustomAxios from "../../../../Hooks/useCustomAxios";
import { Link } from "react-router-dom";
import { GridLoader } from "react-spinners";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { AuthContext } from "../../../../Contexts/AuthContext/AuthProvider";
import { Helmet } from "react-helmet";

const Applications = () => {
  const secureAxios = useAxiosSecure();
  const { user, loading } = useContext(AuthContext);
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <GridLoader color="#198068" size={40} />
      </div>
    );
  }
  const { data: appliedTrainers = [], isFetching } = useQuery({
    queryKey: ["appliedTrainers"],
    queryFn: async () => {
      const res = await secureAxios.get("/appliedTrainers", {
        params: { email: user.email },
      });
      return res.data;
    },
  });
  if (isFetching) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <GridLoader color="#198068" size={40} />
      </div>
    );
  }
  return (
    <>
      <Helmet>
        <title>FitForge | Dashboard | Application</title>
      </Helmet>
      {appliedTrainers.length === 0 ? (
        <p
          data-aos="fade-down"
          className="text-2xl text-red-500 font-bold text-center"
        >
          No Applications found
        </p>
      ) : (
        <div>
          <div className="mb-6">
            <h1
              data-aos="fade-down"
              className="text-3xl font-bold text-gray-800 text-center"
            >
              📋 All Applications
            </h1>
          </div>
          <table className="table table-zebra">
            <thead className="bg-primary text-white text-base md:text-lg lg:text-xl">
              <tr className="text-center">
                <th data-aos="fade-down">No.</th>
                <th data-aos="fade-down">Name</th>
                <th data-aos="fade-down">Email</th>
                <th data-aos="fade-down">Apply Date</th>
                <th data-aos="fade-down">Details</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm md:text-base lg:text-lg">
              {appliedTrainers.map((applicant, index) => (
                <tr key={applicant._id} className="text-center">
                  <td data-aos="fade-up">{index + 1}</td>
                  <td data-aos="fade-up">{applicant.user.name}</td>
                  <td data-aos="fade-up">{applicant.user.email}</td>
                  <td data-aos="fade-up">{applicant.trainer.applyDate}</td>
                  <td data-aos="fade-up">
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
