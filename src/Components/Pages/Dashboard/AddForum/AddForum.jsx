import { useState, useContext, useRef } from "react";
import { AuthContext } from "../../../../Contexts/AuthContext/AuthProvider";
import { GridLoader } from "react-spinners";
import axios from "axios";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { Helmet } from "react-helmet";
const AddForum = () => {
  const { user, loading, image_hosting_api } = useContext(AuthContext);
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <GridLoader color="#A94A4A" size={30} />
      </div>
    );
  }
  const [forum, setForum] = useState({
    title: "",
    description: "",
    image: "",
    postedBy: user?.email || "Unknown",
    totalUpVote: 0,
    totalDownVote: 0,
    postedDate: new Date().toISOString(),
  });
  const fileInputRef = useRef(null);
  const secureAxios = useAxiosSecure();
  const handleChange = (e) => {
    setForum({ ...forum, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setForum({ ...forum, image: e.target.files[0] });
  };
  const ConvertToLink = async (photo) => {
    const formData = new FormData();
    formData.append("image", photo);
    const res = await axios.post(image_hosting_api, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (res.data.success) {
      return res.data.data.url;
    } else {
      Toast("Image Upload Failed", "error");
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const photoURL = await ConvertToLink(forum.image);
    const res = await secureAxios.post(
      "/forums",
      {
        ...forum,
        image: photoURL,
      },
      {
        params: { email: user.email },
      }
    );

    if (res.data.insertedId) {
      setForum({
        title: "",
        description: "",
        image: null,
        postedBy: user?.email || "Unknown",
        totalVote: 0,
        postedDate: new Date().toISOString(),
      });
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Forum added successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      Toast("Class Addition Failed", "error");
    }
  };

  return (
    <div className="flex justify-center items-center">
      <Helmet>
        <title>FitForge | Dashboard | Add Forum</title>
      </Helmet>
      <div className="w-full container mx-auto max-w-3xl bg-white shadow-2xl rounded-2xl p-6">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">
          📢 Create a New Forum
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="font-semibold text-gray-700">Forum Title</label>
            <input
              type="text"
              name="title"
              placeholder="Enter forum title..."
              value={forum.title}
              onChange={handleChange}
              required
              className="mt-1 p-3 border-2 border-gray-300 rounded-lg w-full focus:ring-primary focus:border-primary transition-all"
            />
          </div>

          <div>
            <label className="font-semibold text-gray-700">Description</label>
            <textarea
              name="description"
              placeholder="Describe your forum..."
              rows="4"
              value={forum.description}
              onChange={handleChange}
              required
              className="mt-1 p-3 border-2 border-gray-300 rounded-lg w-full focus:ring-primary focus:border-primary transition-all"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              preview="true"
              ref={fileInputRef}
              className="w-full p-2 border rounded-lg focus:ring-primary focus:border-primary transition-all"
              required
            />
          </div>
          <div>
            <label className="font-semibold text-gray-700">Posted By</label>
            <input
              type="text"
              name="postedBy"
              value={forum.postedBy}
              readOnly
              className="mt-1 p-3 border-2 border-gray-300 rounded-lg w-full focus:ring-primary focus:border-primary transition-all"
            />
          </div>
          <div>
            <label className="font-semibold text-gray-700">Posted Date</label>
            <input
              type="text"
              name="postedDate"
              value={forum.postedDate.date1}
              readOnly
              className="mt-1 p-3 border-2 border-gray-300 rounded-lg w-full focus:ring-primary focus:border-primary transition-all"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary text-white font-bold text-lg py-3 rounded-lg shadow-md transition-all"
          >
            Post Forum
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddForum;
