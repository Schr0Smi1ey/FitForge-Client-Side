import React, { useContext, useEffect, useState } from "react";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { convertDate } from "../../utils/Utilities";
import { useQuery } from "@tanstack/react-query";
import { GridLoader } from "react-spinners";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { AuthContext } from "../../Contexts/AuthContext/AuthProvider";
import { BsPersonBadge } from "react-icons/bs";
import { HiCheckBadge } from "react-icons/hi2";
import useCustomAxios from "../../Hooks/useCustomAxios";
import Aos from "aos";
import "aos/dist/aos.css";
const PostCard = ({ postData, refetch, home }) => {
  const {
    title,
    description,
    image,
    postedBy,
    totalUpVote,
    totalDownVote,
    postedDate,
    liked,
    disliked,
    _id,
  } = postData;
  const { user, loading, Toast } = useContext(AuthContext);
  const [isExpanded, setIsExpanded] = useState(false);
  useEffect(() => {
    Aos.init({ duration: 500 });
  }, []);
  const secureAxios = useAxiosSecure();
  const navigate = useNavigate();
  const customAxios = useCustomAxios();
  const { data: posterData, isFetching } = useQuery({
    queryKey: ["user", postedBy],
    queryFn: async () => {
      const res = await customAxios.get("/posterInfo", {
        params: { postedBy },
      });
      return res.data;
    },
  });
  if (loading || isFetching) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <GridLoader color="#198068" size={40} />
      </div>
    );
  }

  const handleVote = async (vote) => {
    try {
      if (!user) {
        navigate("/login");
        return;
      }
      const res = await secureAxios.patch(
        `/voteForums`,
        {
          forumId: _id,
          vote,
        },
        {
          params: { email: user ? user.email : "" },
        }
      );
      if (res.status === 200) {
        refetch();
      }
    } catch (error) {
      Toast("Error voting", "error");
    }
  };

  const minimizedDescription =
    description.length > 100
      ? description.substring(0, 100) + "..."
      : description;
  const minimizedTitle =
    title.length > 40 ? title.substring(0, 40) + "..." : title;
  return (
    <div className="max-w-4xl w-full mx-auto my-4">
      <div className="bg-white shadow-lg rounded-xl">
        {/* Image Section */}

        <div data-aos="fade-up" className="relative">
          <img
            src={image}
            alt={home ? (isExpanded ? title : minimizedTitle) : title}
            className="w-full h-96 object-fill"
          />
          <div className="absolute top-2 left-2 bg-black bg-opacity-60 text-white px-3 py-1 rounded">
            {convertDate(postedDate, "PostCard")}
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6">
          <h2
            data-aos="fade-right"
            className="text-2xl md:text-3xl font-bold mb-4"
          >
            {home ? (isExpanded ? title : minimizedTitle) : title}
          </h2>
          <p
            data-aos="fade-left"
            className="text-gray-700 text-base md:text-lg mb-4"
          >
            {home
              ? isExpanded
                ? description
                : minimizedDescription
              : description}
          </p>

          {home && description.length > 50 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-primary font-medium mb-4 focus:outline-none"
            >
              {isExpanded ? "Show Less" : "Read More"}
            </button>
          )}

          <hr className="my-4" />

          {/* User & Meta Info */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* User Info */}
            <div data-aos="fade-right" className="flex items-center gap-4">
              <img
                src={posterData?.user?.photoURL}
                alt={posterData?.user?.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-bold text-lg">{posterData?.user?.name}</p>
                <p className="flex items-center gap-2 text-gray-500 text-base">
                  <span>
                    {posterData?.user?.role === "admin" ? (
                      <HiCheckBadge className="text-xl text-primary"></HiCheckBadge>
                    ) : (
                      <BsPersonBadge className="text-xl text-primary"></BsPersonBadge>
                    )}{" "}
                  </span>{" "}
                  {posterData?.user?.role}
                </p>
              </div>
            </div>

            {/* Post Date */}
            <div data-aos="fade-up" className="text-gray-600">
              <p className="text-sm md:text-base">
                {convertDate(postedDate, "PostCard")}
              </p>
            </div>

            {/* Vote Buttons */}
            {!home && (
              <div data-aos="fade-left" className="flex items-center space-x-4">
                <div className="flex items-center gap-1">
                  <span className="font-bold">{totalUpVote}</span>
                  <button
                    onClick={() => handleVote("up")}
                    className="p-2 rounded-full hover:bg-gray-200 transition"
                  >
                    <AiOutlineLike
                      className={`text-3xl ${liked ? "text-green-500" : ""}`}
                    />
                  </button>
                </div>
                <div className="flex items-center gap-1">
                  <span className="font-bold">{totalDownVote}</span>
                  <button
                    onClick={() => handleVote("down")}
                    className="p-2 rounded-full hover:bg-gray-200 transition"
                  >
                    <AiOutlineDislike
                      className={`text-3xl ${disliked ? "text-red-500" : ""}`}
                    />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
