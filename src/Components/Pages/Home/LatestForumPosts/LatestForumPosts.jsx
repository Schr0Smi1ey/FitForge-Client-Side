import React, { useEffect, useState } from "react";
import PostCard from "../../../Cards/PostCard";
import useCustomAxios from "../../../../Hooks/useCustomAxios";
import { useQuery } from "@tanstack/react-query";
import { GridLoader } from "react-spinners";
import { useLocation, useNavigate } from "react-router-dom";

const LatestForumPosts = () => {
  const customAxios = useCustomAxios();
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const { data = [], isFetching } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await customAxios.get(`/forums`);
      setPosts(res.data.posts);
      return res.data;
    },
  });
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const location = useLocation();
  const home = location.pathname === "/";
  if (isFetching) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <GridLoader color="#A94A4A" size={30} />
      </div>
    );
  }
  return (
    <div className="container mx-auto  p-6">
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
        {posts.map((post, index) => (
          <PostCard key={index} postData={post} home={home}></PostCard>
        ))}
      </div>
      <div className="w-fit mx-auto">
        {home && (
          <div className="mt-6">
            <button
              onClick={() => navigate("/community")}
              className="bg-primary/90 rounded-tl-xl rounded-br-xl text-white px-4 py-2 rounded hover:bg-primary transition"
            >
              Explore More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LatestForumPosts;
