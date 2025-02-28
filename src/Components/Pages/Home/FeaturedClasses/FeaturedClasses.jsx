import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import ClassCard from "../../../Cards/ClassCard";
import { GridLoader } from "react-spinners";
import useCustomAxios from "../../../../Hooks/useCustomAxios";
import { useQuery } from "@tanstack/react-query";

const FeaturedClasses = () => {
  useEffect(() => {
    AOS.init();
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
        <GridLoader color="#A94A4A" size={30} />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 lg:px-12 py-16">
      {/* Section Heading */}
      <div
        className="text-center mb-12"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <h2 className="text-4xl font-extrabold text-primary uppercase">
          Featured Classes
        </h2>
        <p className="text-gray-600 mt-3 max-w-xl mx-auto">
          Elevate your fitness journey with expert-led classes tailored for all
          levels.
        </p>
      </div>

      {/* Class Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {classes.map((featuredClass, index) => (
          <div
            key={index}
            data-aos="fade-up"
            data-aos-delay={index * 100 + 200}
          >
            <ClassCard classData={featuredClass} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedClasses;
