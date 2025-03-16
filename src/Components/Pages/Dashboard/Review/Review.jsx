import { useContext, useState } from "react";
import Rating from "react-rating";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { AuthContext } from "../../../../Contexts/AuthContext/AuthProvider";
import { GridLoader } from "react-spinners";

const Review = () => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const secureAxios = useAxiosSecure();
  const { user, loading } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await secureAxios.post(
      "/reviews",
      {
        rating,
        feedback,
      },
      {
        params: { email: user.email },
      }
    );
    if (res.data.insertedId) {
      setRating(0);
      setFeedback("");
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Reviews added successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Reviews addition failed",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <GridLoader color="#198068" size={40} />
      </div>
    );
  }
  return (
    <div className="max-w-5xl mx-auto p-6 bg-white dark:bg-black dark:text-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center text-primary">
        Leave a Review
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="text-center text-gray-700 dark:text-gray-300 mb-1">
          <p>Please select a star rating to give your feedback:</p>
        </div>
        <div className="flex justify-center">
          <Rating
            initialRating={rating}
            onChange={(value) => setRating(value)}
            fractions={10}
            emptySymbol={<span className="text-gray-400 text-5xl">☆</span>}
            fullSymbol={<span className="text-primary text-5xl">★</span>}
          />
        </div>

        <textarea
          className="w-full p-3 dark:bg-black border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Write your feedback here..."
          rows="4"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />

        <button
          type="submit"
          className="w-full text-lg font-semibold bg-primary text-white py-2 rounded-lg hover:opacity-90 transition"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default Review;
