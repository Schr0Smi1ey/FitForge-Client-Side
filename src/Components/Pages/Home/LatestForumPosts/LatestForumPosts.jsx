import Loader from "../../../Shared/Loader/Loader";
import React, { useState } from "react";
import PostCard from "../../../Cards/PostCard";
import Reveal from "../../../Shared/Reveal/Reveal";
import useCustomAxios from "../../../../Hooks/useCustomAxios";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";

const LatestForumPosts = () => {
  const customAxios = useCustomAxios();
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const home = location.pathname === "/";

  const { isFetching } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await customAxios.get(`/forums`);
      setPosts(res.data.posts);
      return res.data;
    },
  });

  if (isFetching) {
    return (
      <Loader size="md" fullScreen={false} />
    );
  }

  return (
    <div className="container mx-auto py-8 rounded-md px-6 md:px-12 lg:px-20 mt-10">
      {/* Section Heading */}
      <div className="text-center mb-12" data-aos="fade-up">
        <h2 className="text-2xl md:text-4xl font-extrabold text-primary uppercase">
          Latest Forum Discussions
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mt-3 max-w-xl mx-auto">
          Stay engaged with the community. Explore trending topics, fitness
          tips, and expert advice.
        </p>
      </div>

      {/* Posts Grid */}
      <div className="grid lg:grid-cols-3 grid-cols-1 gap-6">
        {posts.map((post, index) => (
          <Reveal key={index} index={index}>
            <PostCard postData={post} home={home} />
          </Reveal>
        ))}
      </div>

      {/* Explore More Button */}
      {home && (
        <div className="w-fit mx-auto mt-8">
          <button
            onClick={() => navigate("/community")}
            className="bg-primary/90 rounded-tl-xl rounded-br-xl text-white px-6 py-3 text-lg font-semibold shadow-md hover:bg-primary transition-all duration-300"
            data-aos="fade-up" data-aos-delay="200"
          >
            Explore More
          </button>
        </div>
      )}
    </div>
  );
};

export default LatestForumPosts;
