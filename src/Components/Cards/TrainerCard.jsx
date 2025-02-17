import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";

const TrainerCard = ({ trainer }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden text-center p-6">
      <div className="relative group">
        <img
          src={trainer.photo}
          alt={trainer.name}
          className="rounded-3xl mx-auto mb-4 object-cover transition duration-300 group-hover:opacity-40"
        />

        <div className="absolute inset-0 bg-primary bg-opacity-70 flex items-center justify-center opacity-0 group-hover:opacity-100 rounded-3xl">
          <div className="flex gap-4">
            <a
              href={trainer.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-2xl hover:scale-110 transition"
            >
              <FaFacebookF />
            </a>
            <a
              href={trainer.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-2xl hover:scale-110 transition"
            >
              <FaTwitter />
            </a>
            <a
              href={trainer.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-2xl hover:scale-110 transition"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      {/* Trainer Info */}
      <h3 className="text-2xl font-bold">{trainer.name}</h3>
      <p className="text-gray-500 text-base">{trainer.expertise}</p>
      <p className="text-gray-700 text-base mt-2 line-clamp-3">{trainer.bio}</p>
    </div>
  );
};

export default TrainerCard;
