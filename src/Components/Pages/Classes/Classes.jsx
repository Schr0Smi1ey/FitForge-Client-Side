import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useCustomAxios from "../../../Hooks/useCustomAxios";
import { GridLoader } from "react-spinners";
import ClassCard from "../../Cards/ClassCard";
import { Helmet } from "react-helmet";
import Aos from "aos";
import "aos/dist/aos.css";
const Classes = () => {
  const [classes, setClasses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const limit = 6;
  const customAxios = useCustomAxios();

  useEffect(() => {
    Aos.init({ duration: 500 });
    window.scrollTo(0, 0);
  }, [classes]);
  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const { data, isFetching, refetch } = useQuery({
    queryKey: ["classes", currentPage, searchQuery],
    queryFn: async () => {
      const query = searchQuery ? `&search=${searchQuery}` : "";
      const res = await customAxios.get(
        `/classes?page=${currentPage}&limit=${limit}${query}`
      );
      setClasses(res.data.classes);
      setTotalPages(res.data.totalPages);
      return res.data;
    },
    keepPreviousData: true,
  });

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="container mx-auto px-4 py-32">
      <Helmet>
        <title>FitForge | Classes</title>
      </Helmet>

      {/* Main Heading Section */}
      <div className="text-center mb-12">
        <h1
          data-aos="fade-up"
          className="text-4xl font-bold text-gray-800 dark:text-white mb-4"
        >
          Explore Our Fitness Classes
        </h1>
        <p
          data-aos="fade-up"
          className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          Discover a variety of fitness classes designed to help you achieve
          your goals. From high-intensity workouts to relaxing yoga sessions, we
          have something for everyone.
        </p>

        <div className="flex justify-center my-8">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search by class name..."
            className="input input-bordered w-full md:w-1/3 py-2 px-4 text-lg font-medium border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          />
        </div>
      </div>
      <div>
        {isFetching ? (
          <div className="flex items-center justify-center min-h-screen">
            <GridLoader color="#198068" size={40} />
          </div>
        ) : classes.length > 0 ? (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {classes.map((cls) => (
                <ClassCard key={cls._id} classData={cls} refetch={refetch} />
              ))}
            </div>
          </div>
        ) : (
          <p className="text-5xl text-center font-bold text-red-500 mt-5">
            No classes available.
          </p>
        )}
      </div>

      {/* Pagination Section */}
      <div className="flex justify-center items-center space-x-4 mt-8">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-black text-white dark:bg-white dark:text-black font-medium rounded disabled:opacity-50 transition-colors"
        >
          Previous
        </button>
        <span className="font-medium">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-black text-white dark:bg-white dark:text-black font-medium rounded disabled:opacity-50 transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Classes;
