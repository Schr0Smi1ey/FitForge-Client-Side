import React, { useState } from "react";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import useCustomAxios from "../../Hooks/useCustomAxios";
import { convertDate } from "../../utils/Utilities";

const PostCard = ({ postData, refetch }) => {
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
        <img src={image} alt={title} className="w-full object-cover" />
        <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded">
          {convertDate(postedDate)}
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
              <AiOutlineLike className="text-2xl" />
            </button>
            <span className="font-bold">{totalDownVote}</span>
            <button
              onClick={() => handleVote("down")}
              className={`p-2 rounded-full`}
            >
              <AiOutlineDislike className="text-2xl" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
