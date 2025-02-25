import React, { useEffect, useState } from "react";
import PostCard from "../../Cards/PostCard";
import { useQuery } from "@tanstack/react-query";
import useCustomAxios from "../../../Hooks/useCustomAxios";
import { GridLoader } from "react-spinners";

const Community = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 6;
  const customAxios = useCustomAxios();
  const {
    data = [],
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await customAxios.get(
        `/forums?page=${currentPage}&limit=${limit}`
      );
      setPosts(res.data.posts);
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
  console.log(data);
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Forum</h1>
      <div className="max-w-6xl mx-auto grid grid-cols-1 gap-6">
        {posts.map((post) => (
          <PostCard key={post._id} postData={post} refetch={refetch} />
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
