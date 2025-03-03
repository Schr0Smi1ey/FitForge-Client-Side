import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import PostCard from "../../../Cards/PostCard";
import useCustomAxios from "../../../../Hooks/useCustomAxios";
import { useQuery } from "@tanstack/react-query";
import { GridLoader } from "react-spinners";
import { useLocation, useNavigate } from "react-router-dom";

const LatestForumPosts = () => {
  useEffect(() => {
    AOS.init({ duration: 500 });
  }, []);

  const customAxios = useCustomAxios();
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const home = location.pathname === "/";

  const { data = [], isFetching } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await customAxios.get(`/forums`);
      setPosts(res.data.posts);
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
    <div className="container mx-auto px-6 lg:px-12 py-16">
      {/* Section Heading */}
      <div className="text-center mb-12" data-aos="fade-up">
        <h2 className="text-4xl font-extrabold text-primary uppercase">
          Latest Forum Discussions
        </h2>
        <p className="text-gray-600 mt-3 max-w-xl mx-auto">
          Stay engaged with the community. Explore trending topics, fitness
          tips, and expert advice.
        </p>
      </div>

      {/* Posts Grid */}
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
        {posts.map((post, index) => (
          <div
            key={index}
            data-aos="fade-up"
            data-aos-delay={index * 100 + 200}
          >
            <PostCard postData={post} home={home} />
          </div>
        ))}
      </div>

      {/* Explore More Button */}
      {home && (
        <div className="w-fit mx-auto mt-8">
          <button
            onClick={() => navigate("/community")}
            className="bg-primary/90 rounded-tl-xl rounded-br-xl text-white px-6 py-3 text-lg font-semibold shadow-md hover:bg-primary transition-all duration-300"
            data-aos="fade-up"
            data-aos-delay="500"
          >
            Explore More
          </button>
        </div>
      )}
    </div>
  );
};

export default LatestForumPosts;
