import { useEffect, useState } from "react";
import ClassCard from "../../../Cards/ClassCard";
import useClasses from "../../../../Hooks/useClasses";
import { GridLoader } from "react-spinners";

const FeaturedClasses = () => {
  const { classes, isFetching } = useClasses();
  if (isFetching) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <GridLoader color="#A94A4A" size={30} />
      </div>
    );
  }
  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {classes.map((featuredClass, index) => {
        return <ClassCard key={index} classData={featuredClass}></ClassCard>;
      })}
    </div>
  );
};

export default FeaturedClasses;
