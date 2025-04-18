import React, { useState, useContext, useRef, useEffect } from "react";
import { AuthContext } from "../../../../Contexts/AuthContext/AuthProvider";
import { GridLoader } from "react-spinners";
import Select from "react-select";
import axios from "axios";
import Swal from "sweetalert2";
import AOS from "aos";
import "aos/dist/aos.css";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { Helmet } from "react-helmet";

const skillsOptions = [
  { label: "Strength & Resistance", value: "Strength & Resistance" },
  { label: "Cardio & Endurance", value: "Cardio & Endurance" },
  { label: "Mobility & Flexibility", value: "Mobility & Flexibility" },
  { label: "Sports & Athletic", value: "Sports & Athletic" },
  {
    label: "Rehabilitation & Injury Prevention",
    value: "Rehabilitation & Injury Prevention",
  },
  { label: "Special Populations", value: "Special Populations" },
  { label: "Combat & Martial Arts", value: "Combat & Martial Arts" },
  { label: "Mind-Body Wellness", value: "Mind-Body Wellness" },
  {
    label: "Weight Management & Fat Loss",
    value: "Weight Management & Fat Loss",
  },
];

const daysOptions = [
  { value: "Sun", label: "Sun" },
  { value: "Mon", label: "Mon" },
  { value: "Tues", label: "Tues" },
  { value: "Wed", label: "Wed" },
  { value: "Thu", label: "Thu" },
  { value: "Fri", label: "Fri" },
  { value: "Sat", label: "Sat" },
];

const timeSlots = [
  { value: "Morning", label: "Morning" },
  { value: "Noon", label: "Noon" },
  { value: "Afternoon", label: "Afternoon" },
  { value: "Evening", label: "Evening" },
  { value: "Night", label: "Night" },
];

const BecomeTrainer = () => {
  const { user, loading, image_hosting_api } = useContext(AuthContext);
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    profileImage: null,
    biography: "",
    experience: 0,
    classDuration: "",
    availableTime: "",
    linkedin: "",
    facebook: "",
    twitter: "",
  });
  useEffect(() => {
    AOS.init({ duration: 500 });
  }, []);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [availableDays, setAvailableDays] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);

  const secureAxios = useAxiosSecure();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <GridLoader color="#198068" size={40} />
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "classDuration") {
      setFormData((prev) => ({
        ...prev,
        [name]: parseInt(value),
      }));
      return;
    }
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      profileImage: e.target.files[0],
    }));
  };

  const handleSkillsChange = (e) => {
    const { checked, value } = e.target;
    setSelectedSkills((prev) => {
      if (checked) {
        return [...prev, value];
      } else {
        return prev.filter((skill) => skill !== value);
      }
    });
  };

  const convertImageToUrl = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    try {
      const res = await axios.post(image_hosting_api, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.data.success) {
        return res.data.data.url;
      } else {
        Swal.fire("Image Upload Failed", "", "error");
        return null;
      }
    } catch (err) {
      Swal.fire("Image Upload Failed", "", "error");
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const imageUrl = await convertImageToUrl(formData.profileImage);
    if (!imageUrl) return;

    const socialLinks = [
      formData.linkedin,
      formData.facebook,
      formData.twitter,
    ].filter((link) => link.trim() !== "");

    const trainerData = {
      userId: "",
      fullName: formData.fullName,
      email: user?.email || "unknown@example.com",
      age: formData.age,
      profileImage: imageUrl,
      skills: selectedSkills,
      availableDays: availableDays.map((day) => day.value),
      availableTime: selectedTimeSlot ? selectedTimeSlot.value : "",
      biography: formData.biography,
      experience: formData.experience,
      classDuration: formData.classDuration,
      socialLinks,
      totalRating: 0,
      totalRatedBy: 0,
      applyDate: new Date().toISOString(),
      slots: [],
    };
    try {
      const res = await secureAxios.post("/trainers", trainerData);
      if (res.data.trainerId) {
        Swal.fire({
          icon: "success",
          title: "Application submitted successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        setFormData({
          fullName: "",
          age: "",
          profileImage: null,
          biography: "",
          experience: 0,
          classDuration: "",
          availableTime: "",
          linkedin: "",
          facebook: "",
          twitter: "",
        });
        setSelectedSkills([]);
        setAvailableDays([]);
        setSelectedTimeSlot(null);
      } else {
        Swal.fire(res.data.error, "", "error");
      }
    } catch (error) {
      Swal.fire("Application submission failed", "", "error");
    }
  };
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-black dark:text-white shadow-md rounded-md">
      <Helmet>
        <title>FitForge | Dashboard | Become a Trainer</title>
      </Helmet>
      <h2 data-aos="fade-down" className="text-3xl font-bold mb-4 text-center">
        Join Us as a Trainer
      </h2>
      <p
        data-aos="fade-down"
        data-aos-delay="100"
        className="text-lg text-gray-600 dark:text-gray-400 mb-6 text-center"
      >
        Share your expertise and inspire others by becoming part of our team.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
        <div data-aos="fade-up">
          <label className="font-semibold text-gray-700 dark:text-gray-300">
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter your full name..."
            required
            className="mt-1 w-full p-3 text-gray-700 dark:text-gray-500 dark:bg-black border rounded-md"
          />
        </div>

        {/* Email (read-only) */}
        <div data-aos="fade-up">
          <label className="font-semibold text-gray-700 dark:text-gray-300">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={user?.email || "unknown@example.com"}
            readOnly
            className="mt-1 w-full p-3 border text-gray-700 dark:text-gray-500 dark:bg-black rounded-md"
          />
        </div>

        {/* Age */}
        <div data-aos="fade-up">
          <label className="font-semibold text-gray-700 dark:text-gray-300">
            Age
          </label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Enter your age..."
            required
            className="mt-1 w-full p-3 text-gray-700 dark:text-gray-500 dark:bg-black border rounded-md"
          />
        </div>

        {/* Profile Image */}
        <div data-aos="fade-up">
          <label className="font-semibold text-gray-700 dark:text-gray-300">
            Profile Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            ref={fileInputRef}
            required
            className="mt-1 w-full p-2 text-gray-700 border rounded-md"
          />
        </div>

        {/* Skills */}
        <div data-aos="fade-up">
          <label className="font-semibold text-gray-700 dark:text-gray-300">
            Skills
          </label>
          <div className="mt-1">
            {skillsOptions.map((skill) => (
              <label
                key={skill.value}
                className="mr-4 inline-flex dark:text-gray-400 items-center"
              >
                <input
                  type="checkbox"
                  value={skill.label}
                  checked={selectedSkills.includes(skill.label)}
                  onChange={handleSkillsChange}
                  className="mr-1 text-black"
                />
                {skill.label}
              </label>
            ))}
          </div>
        </div>

        {/* Available Days */}
        <div>
          <label
            data-aos="fade-up"
            className="font-semibold text-gray-700 dark:text-gray-300"
          >
            Available Days a Week
          </label>
          <Select
            className="dark:bg-black dark:border-2 dark:border-white/10 dark:text-black"
            isMulti
            defaultValue={availableDays}
            options={daysOptions}
            onChange={setAvailableDays}
            required
            placeholder="Select available days..."
          />
        </div>

        {/* Available Time */}
        <div>
          <label
            data-aos="fade-up"
            className="font-semibold text-gray-700 dark:text-gray-300"
          >
            Available Time in a Day
          </label>
          <Select
            className="dark:bg-black dark:border-2 dark:border-white/10 dark:text-black"
            id="availableTime"
            name="availableTime"
            options={timeSlots}
            value={selectedTimeSlot}
            onChange={setSelectedTimeSlot}
            placeholder="Select time slot..."
          />
        </div>

        {/* Class Duration */}
        <div data-aos="fade-up">
          <label className="font-semibold text-gray-700 dark:text-gray-300">
            Class Duration (hour)
          </label>
          <input
            id="classDuration"
            type="number"
            name="classDuration"
            value={formData.classDuration}
            onChange={handleChange}
            required
            className="mt-1 w-full p-3 text-gray-700 dark:text-gray-500 dark:bg-black border rounded-md"
            placeholder="Enter class duration..."
          />
        </div>

        {/* Biography */}
        <div data-aos="fade-up">
          <label className="font-semibold text-gray-700 dark:text-gray-300">
            Biography
          </label>
          <textarea
            name="biography"
            value={formData.biography}
            onChange={handleChange}
            placeholder="Tell us about yourself..."
            rows="6"
            required
            className="mt-1 w-full p-3 text-gray-700 dark:text-gray-500 dark:bg-black border rounded-md"
          ></textarea>
        </div>

        {/* Experience */}
        <div data-aos="fade-up">
          <label className="font-semibold text-gray-700 dark:text-gray-300">
            Experience
          </label>
          <input
            type="number"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            placeholder="Describe your training experience..."
            rows="3"
            required
            className="mt-1 w-full p-3 text-gray-700 dark:text-gray-500 dark:bg-black border rounded-md"
          ></input>
        </div>

        {/* Social Links */}
        <div>
          <label className="font-semibold text-gray-700 dark:text-gray-300">
            Social Links
          </label>
          <div className="mt-1 space-y-2">
            <input
              data-aos="fade-up"
              type="url"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleChange}
              placeholder="LinkedIn URL"
              className="w-full p-3 text-gray-700 dark:text-gray-500 dark:bg-black border rounded-md"
            />
            <input
              data-aos="fade-up"
              type="url"
              name="facebook"
              value={formData.facebook}
              onChange={handleChange}
              placeholder="Facebook URL"
              className="w-full p-3 text-gray-700 dark:text-gray-500 dark:bg-black border rounded-md"
            />
            <input
              data-aos="fade-up"
              type="url"
              name="twitter"
              value={formData.twitter}
              onChange={handleChange}
              placeholder="Twitter URL"
              className="w-full p-3 text-gray-700 dark:text-gray-500 dark:bg-black border rounded-md"
            />
          </div>
        </div>

        {/* Apply Button */}
        <div data-aos="fade-up" data-aos-offset="30px" className="text-center">
          <button
            type="submit"
            className="mt-4 bg-primary text-white py-3 px-6 rounded-md font-bold hover:bg-primary-dark transition-all"
          >
            Apply
          </button>
        </div>
      </form>
    </div>
  );
};

export default BecomeTrainer;
