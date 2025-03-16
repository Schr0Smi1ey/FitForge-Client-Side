import React, { useEffect, useState } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import ClassCard from "../../../Cards/ClassCard";
import { GridLoader } from "react-spinners";
import useCustomAxios from "../../../../Hooks/useCustomAxios";
import { useQuery } from "@tanstack/react-query";

const FeaturedClasses = () => {
  useEffect(() => {
    Aos.init({ duration: 500 });
  }, []);

  const customAxios = useCustomAxios();
  const [classes, setClasses] = useState([]);
  const { data, isFetching } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      const res = await customAxios.get("/classes?home=true");
      setClasses(res.data.classes);
      return res.data;
    },
  });

  if (isFetching) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <GridLoader color="#198068" size={40} />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 rounded-md px-6 md:px-8 lg:px-14 mt-10">
      {/* Section Heading */}
      <div className="text-center mb-12" data-aos="fade-up">
        <h2 className="text-2xl md:text-4xl font-extrabold text-primary uppercase">
          Featured Classes
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mt-3 max-w-xl mx-auto">
          Elevate your fitness journey with expert-led classes tailored for all
          levels.
        </p>
      </div>

      {/* Class Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {classes.map((featuredClass, index) => (
          <div key={index} data-aos="fade-up">
            <ClassCard classData={featuredClass} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedClasses;
