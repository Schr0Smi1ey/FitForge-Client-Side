import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useCustomAxios from "../../../Hooks/useCustomAxios";
import { GridLoader } from "react-spinners";
import ClassCard from "../../Cards/ClassCard";
import { Helmet } from "react-helmet";

const Community = () => {
  const [classes, setClasses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 6;
  const customAxios = useCustomAxios();
  const { data, isFetching, refetch } = useQuery({
    queryKey: ["classes", currentPage],
    queryFn: async () => {
      const res = await customAxios.get(
        `/classes?page=${currentPage}&limit=${limit}`
      );
      setClasses(res.data.classes);
      setTotalPages(res.data.totalPages);
      return res.data;
    },
  });
  if (isFetching) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <GridLoader color="#A94A4A" size={30} />
      </div>
    );
  }
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Helmet>
        <title>FitForge | Classes</title>
      </Helmet>
      <h1 className="text-3xl font-bold mb-6 text-center">Forum</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map((cls) => (
          <ClassCard key={cls._id} classData={cls} refetch={refetch} />
        ))}
      </div>
      {/* Pagination */}
      <div className="flex justify-center items-center space-x-4 mt-8">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span className="font-medium">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Community;
