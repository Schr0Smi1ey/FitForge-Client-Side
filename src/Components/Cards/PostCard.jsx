import { FaRegCalendarAlt } from "react-icons/fa";

const PostCard = ({ post }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <img
        src={post.thumbnail}
        alt={post.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex items-center gap-3 mb-3">
          <img
            src={post.profilePic}
            alt={post.postedBy}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <p className="font-semibold">{post.postedBy}</p>
            <p className="text-sm text-gray-500">{post.postedRole}</p>
          </div>
          <div className="flex items-center gap-1 ml-auto text-gray-500">
            <FaRegCalendarAlt />
            <p className="text-sm">{post.date}</p>
          </div>
        </div>
        <h3 className="font-semibold text-lg truncate ...">{post.title}</h3>
        <p className="text-gray-600 text-sm mt-1 mb-2 line-clamp-3 ...">
          {post.description}
        </p>
        <a href="#" className="text-blue-500 hover:underline text-sm">
          Read More
        </a>
      </div>
    </div>
  );
};

export default PostCard;
