import Loader from "../../../Shared/Loader/Loader";
import { useState, useContext, useRef } from "react";
import { AuthContext } from "../../../../Contexts/AuthContext/AuthProvider";
import axios from "axios";
import compressImage, { IMAGE_TARGETS } from "../../../../utils/compressImage";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { Helmet } from "react-helmet";
import { convertDate } from "../../../../utils/Utilities";
const AddForum = () => {
  // `Toast` was missing from this destructuring while being called below, so the
  // image-upload failure path threw ReferenceError instead of showing the error.
  const { user, loading, image_hosting_api, Toast } = useContext(AuthContext);
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
  // Every hook must run before this early return. It used to sit above them, so
  // the number of hooks changed as `loading` flipped and React errored with
  // "Rendered fewer hooks than expected".
  if (loading) {
    return (
      <Loader />
    );
  }
  const handleChange = (e) => {
    setForum({ ...forum, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setForum({ ...forum, image: e.target.files[0] });
  };
  const ConvertToLink = async (photo) => {
    const formData = new FormData();
    formData.append("image", await compressImage(photo, IMAGE_TARGETS.content));
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
        totalUpVote: 0,
        totalDownVote: 0,
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
      <div className="w-full container mx-auto max-w-3xl bg-white dark:bg-black dark:text-white shadow-2xl rounded-2xl p-6">
        <h2
          data-aos="fade-up" data-aos-delay="100"
          className="text-3xl font-bold text-gray-800 dark:text-gray-300 text-center mb-4"
        >
          📢 Create a New Forum
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 dark:border-2 dark:border-gray-800 dark:p-4 dark:rounded-lg"
        >
          <div>
            <label
              data-aos="fade-up" data-aos-delay="100"
              className="font-semibold text-gray-700 dark:text-gray-400"
            >
              Forum Title
            </label>
            <input
              data-aos="fade-up" data-aos-delay="200"
              type="text"
              name="title"
              placeholder="Enter forum title..."
              value={forum.title}
              onChange={handleChange}
              required
              className="mt-1 p-3 border-2 border-gray-300 dark:bg-black dark:text-gray-300 dark:border-gray-600 rounded-lg w-full focus:ring-primary focus:border-primary transition-all"
            />
          </div>

          <div>
            <label
              data-aos="fade-up" data-aos-delay="200"
              className="font-semibold text-gray-700 dark:text-gray-400"
            >
              Description
            </label>
            <textarea
              data-aos="fade-up" data-aos-delay="200"
              name="description"
              placeholder="Describe your forum..."
              rows="4"
              value={forum.description}
              onChange={handleChange}
              required
              className="mt-1 p-3 border-2 border-gray-300 dark:bg-black dark:text-gray-300 dark:border-gray-600 rounded-lg w-full focus:ring-primary focus:border-primary transition-all"
            />
          </div>

          <div>
            <label
              data-aos="fade-up" data-aos-delay="200"
              className="block text-gray-700 dark:text-gray-400 font-medium"
            >
              Image
            </label>
            <input
              data-aos="fade-up" data-aos-delay="200"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              ref={fileInputRef}
              className="w-full p-2 border rounded-lg dark:border-2 dark:border-gray-600 focus:ring-primary focus:border-primary transition-all"
              required
            />
          </div>
          <div>
            <label
              data-aos="fade-up" data-aos-delay="200"
              className="font-semibold text-gray-700 dark:text-gray-400"
            >
              Posted By
            </label>
            <input
              data-aos="fade-up" data-aos-delay="200"
              type="text"
              name="postedBy"
              value={forum.postedBy}
              readOnly
              className="mt-1 p-3 border-2 border-gray-300 dark:bg-black dark:text-gray-300 dark:border-gray-600 rounded-lg w-full focus:ring-primary focus:border-primary transition-all"
            />
          </div>
          <div>
            <label
              data-aos="fade-up" data-aos-delay="200"
              className="font-semibold text-gray-700 dark:text-gray-400"
            >
              Posted Date
            </label>
            <input
              data-aos="fade-up" data-aos-delay="200"
              type="text"
              name="postedDate"
              value={convertDate(forum.postedDate, "AddForum")}
              readOnly
              className="mt-1 p-3 border-2 border-gray-300 dark:bg-black dark:text-gray-300 dark:border-gray-600 rounded-lg w-full focus:ring-primary focus:border-primary transition-all"
            />
          </div>
          <button
            data-aos="fade-up" data-aos-delay="200"
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
