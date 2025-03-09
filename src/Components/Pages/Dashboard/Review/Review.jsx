import { useState } from "react";
import Rating from "react-rating";

const Review = () => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ rating, feedback });
    // Submit logic here (API call, state update, etc.)
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center text-primary">
        Leave a Review
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
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
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
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
