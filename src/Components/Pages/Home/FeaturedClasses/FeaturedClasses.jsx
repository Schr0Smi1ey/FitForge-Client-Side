import { useEffect, useState } from "react";
import ClassCard from "../../../Cards/ClassCard";

const FeaturedClasses = () => {
  const [featuredClasses, setFeaturedClasses] = useState([]);
  useEffect(() => {
    fetch("Classes.json")
      .then((res) => res.json())
      .then((data) => {
        setFeaturedClasses(data);
      });
  });
  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {featuredClasses.map((featuredClass, index) => {
        return <ClassCard key={index} classData={featuredClass}></ClassCard>;
      })}
    </div>
  );
};

export default FeaturedClasses;
