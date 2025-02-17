import React from "react";
import PostCard from "../../../Cards/PostCard";
import userImg from "../../../../assets/Home/Testimonials/commenter1.jpg";
import card from "../../../../assets/Home/Featured/6.png";
const posts = [
  {
    title: "Track Your Progress lorem ipsum dolor sit amet consectetur",
    description:
      "SyncFit provides tools to help you track your fitness progress effectively.lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptate. lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptate.",
    postedBy: "Olivia Davis",
    postedRole: "Admin",
    date: "29 May, 2024",
    thumbnail: card,
    profilePic: userImg,
  },
  {
    title: "Mastering Tailwind CSS for Modern UI Design",
    description:
      "Learn how Tailwind CSS helps build responsive and scalable UI designs.",
    postedBy: "John Smith",
    postedRole: "Trainer",
    date: "14 Feb, 2025",
    thumbnail: card,
    profilePic: userImg,
  },
];

const LatestForumPosts = () => {
  return (
    <div className="container mx-auto grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 p-6">
      {posts.map((post, index) => (
        <PostCard key={index} post={post}></PostCard>
      ))}
    </div>
  );
};

export default LatestForumPosts;
