import TrainerCard from "../../../Cards/TrainerCard";
import userImg from "../../../../assets/Home/Testimonials/commenter1.jpg";
const Team = () => {
  const trainers = [
    {
      name: "John Doe",
      expertise: "Strength Training, Nutrition",
      bio: "Certified trainer with over 10 years of experience helping clients achieve their fitness goals.",
      photo: userImg,
    },
    {
      name: "Jane Smith",
      expertise: "Yoga, Mindfulness,Strength Training, Nutrition",
      bio: "Experienced yoga instructor specializing in mindfulness and holistic wellness.",
      photo: userImg,
    },
    {
      name: "Mike Johnson",
      expertise: "Cardio, Endurance",
      bio: "Passionate fitness coach focusing on improving endurance and cardiovascular health.",
      photo: userImg,
    },
  ];

  return (
    <div className="container mx-auto text-center">
      <h2 className="text-2xl font-bold mb-5">Meet Our Trainers</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {trainers.map((trainer, index) => (
          <TrainerCard key={index} trainer={trainer} />
        ))}
      </div>
    </div>
  );
};

export default Team;
