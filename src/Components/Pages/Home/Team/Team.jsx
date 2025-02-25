import TrainerCard from "../../../Cards/TrainerCard";
import userImg from "../../../../assets/Home/Testimonials/commenter1.jpg";
import useTrainers from "../../../../Hooks/useTrainers";
import { GridLoader } from "react-spinners";
const Team = () => {
  const { trainers, isFetching } = useTrainers();
  if (isFetching) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <GridLoader color="#A94A4A" size={30} />
      </div>
    );
  }
  const toShow = trainers.slice(0, 3);
  return (
    <div className="container mx-auto text-center">
      <h2 className="text-2xl font-bold mb-5">Meet Our Trainers</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {toShow.map((trainer, index) => (
          <TrainerCard key={index} trainer={trainer} />
        ))}
      </div>
    </div>
  );
};

export default Team;
