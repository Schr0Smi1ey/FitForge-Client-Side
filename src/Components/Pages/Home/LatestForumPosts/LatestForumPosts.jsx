import React, { useState } from "react";
import PostCard from "../../../Cards/PostCard";
import useCustomAxios from "../../../../Hooks/useCustomAxios";
import { useQuery } from "@tanstack/react-query";
import { GridLoader } from "react-spinners";

const LatestForumPosts = () => {
  const customAxios = useCustomAxios();
  const [posts, setPosts] = useState([]);
  const {
    data = [],
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await customAxios.get(`/forums?page=${1}&limit=${6}`);
      setPosts(res.data.posts);
      return res.data;
    },
  });
  console.log(data);
  console.log(posts);
  if (isFetching) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <GridLoader color="#A94A4A" size={30} />
      </div>
    );
  }
  return (
    <div className="container mx-auto grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 p-6">
      {posts.map((post, index) => (
        <PostCard key={index} postData={post}></PostCard>
      ))}
    </div>
  );
};

export default LatestForumPosts;
