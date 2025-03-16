import React, { useEffect } from "react";
import useTrainers from "../../../Hooks/useTrainers";
import TrainerCard from "../../Cards/TrainerCard";
import { GridLoader } from "react-spinners";
import { Helmet } from "react-helmet";
import Aos from "aos";
import "aos/dist/aos.css";

const Trainers = () => {
  const { trainers, isFetching } = useTrainers();

  useEffect(() => {
    Aos.init({ duration: 500 });
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen container mx-auto py-32">
      <Helmet>
        <title>FitForge | Trainers</title>
      </Helmet>

      {/* Heading Section */}
      <div className="text-center mb-12" data-aos="fade-up">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
          Meet Our Expert Trainers
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Our certified trainers are here to guide, motivate, and help you
          achieve your fitness goals. Whether you're a beginner or an advanced
          athlete, our team is dedicated to providing personalized support and
          expertise.
        </p>
      </div>

      {/* Trainers Grid */}
      <div>
        {isFetching ? (
          <div className="flex items-center justify-center min-h-screen">
            <GridLoader color="#198068" size={40} />
          </div>
        ) : trainers.length > 0 ? (
          <div>
            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              {trainers.map((trainer) => (
                <TrainerCard key={trainer._id} trainer={trainer} />
              ))}
            </div>
          </div>
        ) : (
          <p className="text-5xl text-center font-bold text-red-500 mt-5">
            No trainers available.
          </p>
        )}
      </div>
    </div>
  );
};

export default Trainers;
