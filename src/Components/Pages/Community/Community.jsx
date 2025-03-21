import React, { useContext, useEffect, useState } from "react";
import PostCard from "../../Cards/PostCard";
import { useQuery } from "@tanstack/react-query";
import useCustomAxios from "../../../Hooks/useCustomAxios";
import { GridLoader } from "react-spinners";
import { Helmet } from "react-helmet";
import { AuthContext } from "../../../Contexts/AuthContext/AuthProvider";
import Aos from "aos";
import "aos/dist/aos.css";
const Community = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 6;
  const { user, loading } = useContext(AuthContext);
  const customAxios = useCustomAxios();
  useEffect(() => {
    Aos.init({ duration: 500 });
    window.scrollTo(0, 0);
  }, []);
  const { data, isFetching, refetch } = useQuery({
    queryKey: ["posts", currentPage],
    queryFn: async () => {
      const res = await customAxios.get(
        `/forums?page=${currentPage}&limit=${limit}`,
        {
          params: { email: user?.email },
        }
      );
      setPosts(res.data.posts);
      setTotalPages(res.data.totalPages);
      return res.data;
    },
  });

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="container mx-auto px-4 py-32">
      <Helmet>
        <title>FitForge | Community</title>
      </Helmet>

      {/* Header Section */}
      <div className="text-center mb-12">
        <h1
          data-aos="fade-up"
          className="text-4xl font-bold text-gray-800 dark:text-white mb-4"
        >
          Welcome to the FitForge Community
        </h1>
        <p
          data-aos="fade-up"
          className="text-lg text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed text-center"
        >
          Join our vibrant fitness community to gain insights from experts and
          grow alongside like-minded individuals. Whether you're a beginner or a
          fitness pro, this is your space to excel, connect, and inspire!
        </p>
      </div>

      {/* Forum Posts Section */}
      <h2
        data-aos="fade-right"
        className="text-2xl text-center font-semibold text-gray-800 dark:text-gray-400 mb-6"
      >
        Recent Forum Posts
      </h2>

      <div>
        {isFetching || loading ? (
          <div className="flex items-center justify-center min-h-screen">
            <GridLoader color="#198068" size={40} />
          </div>
        ) : posts.length > 0 ? (
          <div>
            <div className="max-w-6xl mx-auto grid grid-cols-1 gap-6">
              {posts.map((post) => (
                <PostCard key={post._id} postData={post} refetch={refetch} />
              ))}
            </div>
          </div>
        ) : (
          <p className="text-5xl text-center font-bold text-red-500 mt-5">
            No posts available.
          </p>
        )}
      </div>

      {/* Pagination */}
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

export default Community;
