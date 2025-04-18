import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import TrainerCard from "../../../Cards/TrainerCard";
import useTrainers from "../../../../Hooks/useTrainers";
import { GridLoader } from "react-spinners";

const Team = () => {
  useEffect(() => {
    AOS.init({ duration: 500 });
  }, []);

  const { trainers, isFetching } = useTrainers();

  if (isFetching) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <GridLoader color="#198068" size={40} />
      </div>
    );
  }

  const toShow = trainers.slice(0, 3);

  return (
    <div
      className="container mx-auto py-8 rounded-md px-6 md:px-12 lg:px-20 my-10 text-center"
      data-aos="fade-up"
    >
      <h2
        className="text-primary text-2xl md:text-4xl font-extrabold mb-6"
        data-aos="zoom-in"
      >
        Meet Our Expert Trainers
      </h2>
      <p
        className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-10 text-lg"
        data-aos="zoom-in"
        data-aos-delay="200"
      >
        Our trainers bring a wealth of experience and passion to help you
        achieve your fitness goals.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {toShow.map((trainer, index) => (
          <div key={index} data-aos="fade-up" data-aos-delay={index * 200}>
            <TrainerCard trainer={trainer} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
