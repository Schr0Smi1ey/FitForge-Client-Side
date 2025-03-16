import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import AOS from "aos";
import "aos/dist/aos.css";
import { AuthContext } from "../../Contexts/AuthContext/AuthProvider";
import axios from "axios";
const UpdateProfile = () => {
  const { user, updateUserProfile, Toast, setLoading, image_hosting_api } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    displayName: user.displayName || "",
    photo: null,
  });
  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.init({ duration: 500 });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, photo: file });
    }
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
    setLoading(true);
    const photoURL = await ConvertToLink(formData.photo);
    updateUserProfile(formData.displayName, photoURL)
      .then(() => {
        setTimeout(() => {
          navigate("/dashboard/profile");
          Toast("Profile Updated Successfully", "success");
        }, 200);
      })
      .catch((error) => {
        Toast(error.message, "error");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="min-h-[500px] flex items-center justify-center bg-gray-100 bg-gradient-to-r from-primary/40 to-primary/50">
      <Helmet>
        <title>FitForge | Update Profile</title>
      </Helmet>
      <div
        data-aos="zoom-in"
        className="bg-white shadow-lg rounded-lg w-full max-w-md p-6"
      >
        <h2
          data-aos="fade-down"
          className="text-3xl text-center font-bold text-gray-800 mb-4"
        >
          Update Profile
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div data-aos="fade-up">
            <label
              htmlFor="displayName"
              className="block text-gray-700 font-medium mb-2"
            >
              New Name
            </label>
            <input
              type="text"
              id="displayName"
              name="displayName"
              value={formData.displayName}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Enter your new name"
              required
            />
          </div>
          <div data-aos="fade-up">
            <label
              htmlFor="photoURL"
              className="block text-gray-700 font-medium mb-2"
            >
              New Profile
            </label>
            <input
              type="file"
              id="photo"
              accept="image/*"
              onChange={handleFileChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:ring-2"
            />
          </div>

          <button
            data-aos="fade-up"
            type="submit"
            className="w-full py-3 bg-primary/90 text-white rounded-lg font-semibold hover:bg-primary"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
