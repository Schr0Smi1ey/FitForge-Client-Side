import TableSkeleton from "../../../Shared/Loader/TableSkeleton";
import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { AuthContext } from "../../../../Contexts/AuthContext/AuthProvider";
import { Helmet } from "react-helmet";

const Applications = () => {
  const secureAxios = useAxiosSecure();
  const { user, loading } = useContext(AuthContext);
  const { data: appliedTrainers = [], isFetching } = useQuery({
    queryKey: ["appliedTrainers"],
    queryFn: async () => {
      const res = await secureAxios.get("/appliedTrainers", {
        params: { email: user.email },
      });
      return res.data;
    },
  });
  // Both guards live below every hook. The `loading` check used to sit above
  // useQuery, so the hook count changed as auth resolved and React errored with
  // "Rendered fewer hooks than expected".
  if (loading || isFetching) {
    return (
      <TableSkeleton rows={5} columns={5} />
    );
  }
  // The route already returns only pending applications, so this is the size of
  // the queue waiting on an admin — the one number this page exists to answer,
  // which previously required counting the table by eye.
  const pendingCount = appliedTrainers.length;

  return (
    <>
      <Helmet>
        <title>FitForge | Dashboard | Application</title>
      </Helmet>

      <div
        data-aos="fade-up"
        className="mx-auto mb-6 w-fit rounded-2xl border dark:border-gray-700 bg-white dark:bg-black px-8 py-5 text-center shadow-sm"
      >
        <p className="text-4xl font-extrabold text-primary">{pendingCount}</p>
        <p className="mt-1 text-sm uppercase tracking-wide text-gray-600 dark:text-gray-400">
          {pendingCount === 1 ? "Application" : "Applications"} awaiting review
        </p>
      </div>

      {appliedTrainers.length === 0 ? (
        <p
          data-aos="fade-up"
          className="text-2xl text-red-500 font-bold text-center"
        >
          No Applications found
        </p>
      ) : (
        <div>
          <div className="mb-6">
            <h1
              data-aos="fade-up"
              className="text-3xl font-bold text-gray-800 dark:text-gray-300 text-center"
            >
              📋 All Applications
            </h1>
          </div>
          <table className="table table-zebra">
            <thead className="bg-primary text-white text-base md:text-lg lg:text-xl">
              <tr className="text-center">
                <th data-aos="fade-up">No.</th>
                <th data-aos="fade-up">Name</th>
                <th data-aos="fade-up">Email</th>
                <th data-aos="fade-up">Apply Date</th>
                <th data-aos="fade-up">Details</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 dark:text-gray-400 text-sm md:text-base lg:text-lg">
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
