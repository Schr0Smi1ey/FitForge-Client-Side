import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../../../Contexts/AuthContext/AuthProvider";
import useCustomAxios from "../../../../Hooks/useCustomAxios";
import axios from "axios";
import Swal from "sweetalert2";

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
  const customAxios = useCustomAxios();
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
    const res = await customAxios.post("/classes", {
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
    <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <Helmet>
        <title>FitForge | Dashboard | Add Class</title>
      </Helmet>
      <h2 className="text-2xl font-bold mb-4 text-center">Add New Class</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium">Class Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            required
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
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            rows="3"
            required
          ></textarea>
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            required
          >
            <option value="" disabled></option>
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
        <div>
          <label className="block text-gray-700 font-medium">Duration</label>
          <select
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            required
          >
            <option value="" disabled></option>
            <option value="1">1 hr</option>
            <option value="2">2 hr</option>
            <option value="3">3 hr</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Intensity</label>
          <select
            name="intensity"
            value={formData.intensity}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            required
          >
            <option value="" disabled></option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary"
        >
          Add Class
        </button>
      </form>
    </div>
  );
};

export default AddClass;
