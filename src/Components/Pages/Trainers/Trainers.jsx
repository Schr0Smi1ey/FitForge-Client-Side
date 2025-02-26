import React from "react";
import useTrainers from "../../../Hooks/useTrainers";
import TrainerCard from "../../Cards/TrainerCard";
import { GridLoader } from "react-spinners";
import { Helmet } from "react-helmet";
const Trainers = () => {
  const { trainers, isFetching } = useTrainers();
  if (isFetching) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <GridLoader color="#A94A4A" size={30} />
      </div>
    );
  }
  return (
    <div className="min-h-screen container mx-auto pt-32">
      <Helmet>
        <title>FitForge | Trainers</title>
      </Helmet>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trainers.map((trainer) => (
          <TrainerCard key={trainer._id} trainer={trainer}></TrainerCard>
        ))}
      </div>
    </div>
  );
};

export default Trainers;
