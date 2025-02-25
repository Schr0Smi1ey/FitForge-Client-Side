import React from "react";
import useTrainers from "../../../Hooks/useTrainers";
import TrainerCard from "../../Cards/TrainerCard";
import { GridLoader } from "react-spinners";
const Trainers = () => {
  const { trainers, isFetching } = useTrainers();
  if (isFetching) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <GridLoader color="#A94A4A" size={30} />
      </div>
    );
  }
  console.log(trainers);
  return (
    <div className="container mx-auto pt-32">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trainers.map((trainer) => (
          <TrainerCard key={trainer._id} trainer={trainer}></TrainerCard>
        ))}
      </div>
    </div>
  );
};

export default Trainers;
