import React, { useState } from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import useCustomAxios from "../../Hooks/useCustomAxios";

const PostCard = ({ postData, refetch }) => {
  const {
    title,
    description,
    image,
    postedBy,
    totalUpVote,
    totalDownVote,
    date1,
    _id,
  } = postData;
  console.log(typeof refetch);
  const customAxios = useCustomAxios();
  const handleVote = async (vote) => {
    // if (userVote === vote) return;
    try {
      const res = await customAxios.patch(`/voteForums`, {
        forumId: _id,
        vote: vote,
      });
      const data = res.data;
      if (res.status === 200) {
        console.log(data);
        refetch();
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error("Error voting:", error);
    }
  };

  return (
    <div className="bg-white shadow rounded-xl overflow-hidden">
      <div className="relative">
        <img src={image} alt={title} className="w-full h-48 object-cover" />
        <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded">
          {date1}
        </div>
      </div>
      <div className="p-4">
        <h2 className="text-2xl font-semibold mb-2">{title}</h2>
        <p className="text-gray-700 text-sm mb-4">{description}</p>
        <div className="flex items-center justify-between">
          <div className="text-gray-600 text-sm">
            Posted by: <span className="font-medium">{postedBy}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="font-bold">{totalUpVote}</span>
            <button
              onClick={() => handleVote("up")}
              className={`p-2 rounded-full transition`}
            >
              <FaArrowUp />
            </button>
            <span className="font-bold">{totalDownVote}</span>
            <button
              onClick={() => handleVote("down")}
              className={`p-2 rounded-full`}
            >
              <FaArrowDown />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
