import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../../../Contexts/AuthContext/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Aos from "aos";
import "aos/dist/aos.css";
const AddClass = () => {
  const [formData, setFormData] = useState({
    title: "",
    image: null,
    description: "",
    intensity: "",
    category: "",
    duration: "",
  });
  const { image_hosting_api, Toast } = useContext(AuthContext);
  const fileInputRef = useRef(null);
  const secureAxios = useAxiosSecure();
  useEffect(() => {
    Aos.init({ duration: 500 });
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "duration") {
      setFormData({ ...formData, [name]: parseInt(value) });
      return;
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
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
    const photoURL = await ConvertToLink(formData.image);
    const res = await secureAxios.post("/classes", {
      ...formData,
      booked: 0,
      trainers: [],
      postedDate: new Date().toISOString(),
      image: photoURL,
    });
    if (res.data.insertedId) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Class added successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      setFormData({
        title: "",
        image: null,
        description: "",
        category: "",
        duration: "",
        intensity: "",
      });
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } else {
      Toast("Class Addition Failed", "error");
    }
  };

  return (
    <div className="container mx-auto max-w-4xl bg-white p-8 rounded-2xl shadow-lg">
      <Helmet>
        <title>FitForge | Dashboard | Add Class</title>
      </Helmet>
      <h2
        data-aos="fade-down"
        data-aos-delay="100"
        className="text-3xl font-bold mb-6 text-center text-primary"
      >
        Add New Class
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Class Title */}
        <div>
          <label
            data-aos="fade-up"
            data-aos-delay="150"
            className="block text-gray-600 font-semibold mb-1"
          >
            Class Title
          </label>
          <input
            data-aos="fade-up"
            data-aos-delay="150"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>

        {/* Image Upload */}
        <div>
          <label
            data-aos="fade-up"
            data-aos-delay="150"
            className="block text-gray-600 font-semibold mb-1"
          >
            Upload Image
          </label>
          <input
            data-aos="fade-up"
            data-aos-delay="150"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            ref={fileInputRef}
            className="w-full p-3 border border-gray-300 rounded-lg cursor-pointer focus:outline-none"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label
            data-aos="fade-up"
            data-aos-delay="150"
            className="block text-gray-600 font-semibold mb-1"
          >
            Description
          </label>
          <textarea
            data-aos="fade-up"
            data-aos-delay="150"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            rows="4"
            required
          ></textarea>
        </div>

        {/* Category */}
        <div>
          <label
            data-aos="fade-up"
            data-aos-delay="150"
            className="block text-gray-600 font-semibold mb-1"
          >
            Category
          </label>
          <select
            data-aos="fade-up"
            data-aos-delay="150"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            required
          >
            <option value="" disabled>
              Select Category
            </option>
            <option value="Strength & Resistance">Strength & Resistance</option>
            <option value="Cardio & Endurance">Cardio & Endurance</option>
            <option value="Mobility & Flexibility">
              Mobility & Flexibility
            </option>
            <option value="Sports & Athletic">Sports & Athletic</option>
            <option value="Rehabilitation & Injury Prevention">
              Rehabilitation & Injury Prevention
            </option>
            <option value="Special Populations">Special Populations</option>
            <option value="Combat & Martial Arts">Combat & Martial Arts</option>
            <option value="Mind-Body Wellness">Mind-Body Wellness</option>
            <option value="Weight Management & Fat Loss">
              Weight Management & Fat Loss
            </option>
          </select>
        </div>

        {/* Duration */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              data-aos="fade-up"
              data-aos-delay="150"
              className="block text-gray-600 font-semibold mb-1"
            >
              Duration
            </label>
            <select
              data-aos="fade-up"
              data-aos-delay="150"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            >
              <option value="" disabled>
                Select Duration
              </option>
              <option value="1">1 Hour</option>
              <option value="2">2 Hours</option>
              <option value="3">3 Hours</option>
            </select>
          </div>

          {/* Intensity */}
          <div>
            <label
              data-aos="fade-up"
              data-aos-delay="150"
              className="block text-gray-600 font-semibold mb-1"
            >
              Intensity
            </label>
            <select
              data-aos="fade-up"
              data-aos-delay="150"
              name="intensity"
              value={formData.intensity}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            >
              <option value="" disabled>
                Select Intensity
              </option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <button
          data-aos="fade-up"
          data-aos-delay="150"
          type="submit"
          className="w-full bg-primary text-white py-3 rounded-lg text-lg font-semibold hover:bg-opacity-90 transition-all duration-200"
        >
          Add Class
        </button>
      </form>
    </div>
  );
};

export default AddClass;
