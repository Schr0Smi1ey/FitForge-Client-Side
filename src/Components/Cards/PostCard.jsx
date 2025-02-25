import React, { useState } from "react";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import useCustomAxios from "../../Hooks/useCustomAxios";
import { convertDate } from "../../utils/Utilities";
import { useQuery } from "@tanstack/react-query";
import { GridLoader } from "react-spinners";

const PostCard = ({ postData, refetch, home }) => {
  const {
    title,
    description,
    image,
    postedBy,
    totalUpVote,
    totalDownVote,
    postedDate,
    _id,
  } = postData;

  const customAxios = useCustomAxios();
  const navigate = useNavigate();

  // Fetch user info using react-query
  const { data: user, isFetching } = useQuery({
    queryKey: ["user", postedBy],
    queryFn: async () => {
      const res = await customAxios.get("/user", {
        params: { email: postedBy },
      });
      return res.data;
    },
  });

  // Local state for toggling the description
  const [isExpanded, setIsExpanded] = useState(false);

  if (isFetching) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <GridLoader color="#A94A4A" size={30} />
      </div>
    );
  }

  const handleVote = async (vote) => {
    try {
      const res = await customAxios.patch(`/voteForums`, {
        forumId: _id,
        vote,
      });
      if (res.status === 200) {
        refetch();
      } else {
        console.error(res.data.error);
      }
    } catch (error) {
      console.error("Error voting:", error);
    }
  };

  const minimizedDescription =
    description.length > 100
      ? description.substring(0, 100) + "..."
      : description;
  const minimizedTitle =
    title.length > 40 ? title.substring(0, 40) + "..." : title;

  return (
    <div className="max-w-4xl mx-auto my-4">
      <div className="bg-white shadow-lg rounded-xl overflow-hidden">
        {/* Image Section */}
        <div className="relative">
          <img
            src={image}
            alt={home ? (isExpanded ? title : minimizedTitle) : title}
            className="w-full h-96 object-fill"
          />
          <div className="absolute top-2 left-2 bg-black bg-opacity-60 text-white px-3 py-1 rounded">
            {convertDate(postedDate)}
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            {home ? (isExpanded ? title : minimizedTitle) : title}
          </h2>
          <p className="text-gray-700 text-base md:text-lg mb-4">
            {home
              ? isExpanded
                ? description
                : minimizedDescription
              : description}
          </p>

          {home && description.length > 50 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-blue-500 font-medium mb-4 focus:outline-none"
            >
              {isExpanded ? "Show Less" : "Read More"}
            </button>
          )}

          <hr className="my-4" />

          {/* User & Meta Info */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* User Info */}
            <div className="flex items-center gap-4">
              <img
                src={user.photoURL}
                alt={user.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-bold text-lg">{user.name}</p>
                <p className="text-gray-500 text-sm">{user.role}</p>
              </div>
            </div>

            {/* Post Date (repeated if needed) */}
            <div className="text-gray-600">
              <p className="text-sm md:text-base">{convertDate(postedDate)}</p>
            </div>

            {/* Vote Buttons (only if not on home) */}
            {!home && (
              <div className="flex items-center space-x-4">
                <div className="flex items-center gap-1">
                  <span className="font-bold">{totalUpVote}</span>
                  <button
                    onClick={() => handleVote("up")}
                    className="p-2 rounded-full hover:bg-gray-200 transition"
                  >
                    <AiOutlineLike className="text-2xl" />
                  </button>
                </div>
                <div className="flex items-center gap-1">
                  <span className="font-bold">{totalDownVote}</span>
                  <button
                    onClick={() => handleVote("down")}
                    className="p-2 rounded-full hover:bg-gray-200 transition"
                  >
                    <AiOutlineDislike className="text-2xl" />
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
