import React, { useState, useEffect, useContext } from "react";
import Select from "react-select";
import { useQuery } from "@tanstack/react-query";
import useCustomAxios from "../../Hooks/useCustomAxios";
import { AuthContext } from "../../Contexts/AuthContext/AuthProvider";
import { GridLoader } from "react-spinners";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const AddSlotForm = () => {
  const { user, loading } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [trainerData, setTrainerData] = useState(null);
  const [classData, setClassData] = useState(null);
  const [formData, setFormData] = useState({
    slotName: null,
    slotTime: "",
    selectedDay: null,
    selectedClass: null,
  });
  const secureAxios = useAxiosSecure();
  const customAxios = useCustomAxios();
  const {
    data: trainer,
    isFetching: isFetchingTrainer,
    refetch,
  } = useQuery({
    queryKey: ["trainer"],
    queryFn: async () => {
      const res = await secureAxios.get("/user", {
        params: { email: user.email, role: "trainer" },
      });
      setUserData(res.data.user);
      setTrainerData(res.data.trainer);
      return res.data;
    },
  });
  const { data: classes, isFetching: isFetchingClasses } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      const res = await customAxios.get("/classes?slotForm=true");
      setClassData(res.data);
      return res.data;
    },
  });

  if (loading || isFetchingClasses || isFetchingTrainer) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <GridLoader color="#A94A4A" size={40} />
      </div>
    );
  }

  const slotNameOptions = [
    { value: "Morning-Burn", label: "🌞 Morning Burn" },
    { value: "Power-Hour", label: "💥 Power Hour" },
    { value: "Afternoon-Blitz", label: "⚡ Afternoon Blitz" },
    { value: "Night-Fuel", label: "🌙 Night Fuel" },
    { value: "Peak-Performance", label: "🏆 Peak Performance" },
  ];

  const classOptions = (classData || []).map((cls) => ({
    value: cls._id,
    label: cls.title,
  }));
  const dayOptions = (trainerData?.availableDays || []).map((day) => ({
    value: day,
    label: day,
  }));

  const handleSelectChange = (selectedOption, field) => {
    setFormData((prev) => ({ ...prev, [field]: selectedOption.value }));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await secureAxios.post(
      `/add-slot`,
      {
        slot: {
          slotName: formData.slotName,
          slotTime: formData.slotTime,
          selectedDay: formData.selectedDay,
          selectedClass: formData.selectedClass,
          bookedMembers: [],
        },
        trainerId: trainerData._id,
      },
      {
        params: { email: user.email },
      }
    );

    if (res.data.error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: res.data.error,
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Slot added successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      refetch();
      setFormData({
        slotName: null,
        slotTime: "",
        selectedDay: null,
        selectedClass: null,
      });
    }
  };

  return (
    <div className="mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl text-center font-bold mb-2">Add a New Slot</h2>
      <p className="text-lg text-center text-gray-600 mb-6">
        Customize your availability and connect with clients effortlessly.
      </p>

      {/* Trainer Info (Read-Only) */}
      {trainerData && (
        <div className="grid grid-cols-2 gap-4 bg-gray-100 p-4 rounded-md">
          <div>
            <label className="font-bold">Name:</label>
            <input
              type="text"
              value={userData?.name}
              readOnly
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="font-bold">Email:</label>
            <input
              type="text"
              value={userData?.email}
              readOnly
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="font-bold">Available Days:</label>
            <input
              type="text"
              value={trainerData.availableDays}
              readOnly
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="font-bold">Experience (Years):</label>
            <input
              type="text"
              value={trainerData.experience}
              readOnly
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="font-bold">Age</label>
            <input
              type="text"
              value={trainerData.age}
              readOnly
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="font-bold">Profile URL</label>
            <input
              type="text"
              value={trainerData.profileImage}
              readOnly
              className="input input-bordered w-full"
            />
          </div>
          <div className="col-span-2 h-fit mb-4">
            <label className="font-bold">Skills</label>
            <textarea
              value={(trainerData.skills || []).join(", ")}
              readOnly
              className="input input-bordered w-full h-fit p-2 overflow-auto"
              style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}
            />
          </div>
          <div>
            <label className="font-bold">Class Duration</label>
            <input
              type="text"
              value={trainerData.classDuration}
              readOnly
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="font-bold">Available Time</label>
            <input
              type="text"
              value={trainerData.availableTime}
              readOnly
              className="input input-bordered w-full"
            />
          </div>
          <div className="col-span-2 h-auto mb-4">
            <label className="font-bold">Biography</label>
            <textarea
              value={trainerData.biography}
              readOnly
              className="input input-bordered w-full h-32 h p-2"
              style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }} // Ensures long words break appropriately
            />
          </div>
        </div>
      )}
      <div className="divider"></div>
      {/* Slot Form */}

      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        {/* Class Selection */}
        <div>
          <label className="font-bold">Select Class</label>
          <Select
            options={classOptions}
            // value={formData.selectedClass}
            onChange={(option) => handleSelectChange(option, "selectedClass")}
            placeholder="Choose a class..."
          />
        </div>
        {/* Slot Name */}
        <div>
          <label className="font-bold">Select Slot</label>
          <Select
            options={slotNameOptions}
            // value={formData.slotName}
            onChange={(option) => handleSelectChange(option, "slotName")}
            placeholder="Choose a Slot Name..."
          />
        </div>

        {/* Slot Time */}
        <div>
          <label className="font-bold">Slot Time (Hours)</label>
          <input
            type="number"
            name="slotTime"
            value={formData.slotTime}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Day Selection */}
        <div>
          <label className="font-bold">Select Day</label>
          <Select
            options={dayOptions}
            // value={formData.selectedDay}
            onChange={(option) => handleSelectChange(option, "selectedDay")}
            placeholder="Choose a day..."
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary w-full mt-4">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddSlotForm;
