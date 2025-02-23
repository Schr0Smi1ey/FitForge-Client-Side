import React from "react";
import useClasses from "../../../Hooks/useClasses";
import { GridLoader } from "react-spinners";
import ClassCard from "../../Cards/ClassCard";

const Classes = () => {
  const { classes, isFetching } = useClasses();
  if (isFetching) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <GridLoader color="#A94A4A" size={30} />
      </div>
    );
  }
  return (
    <div className="container mx-auto pt-32">
      <p className="text-center">All Classes</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {classes.map((classData) => (
          <ClassCard key={classData._id} classData={classData} />
        ))}
      </div>
    </div>
  );
};

export default Classes;
