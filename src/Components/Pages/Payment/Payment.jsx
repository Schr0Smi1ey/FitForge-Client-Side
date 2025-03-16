import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import AOS from "aos";
import "aos/dist/aos.css";

import PaymentForm from "../../Forms/PaymentForm";

// Load Stripe
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { trainer, slot, packageName } = location.state || {};

  useEffect(() => {
    AOS.init({ duration: 500 });
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container mx-auto dark:bg-black dark:text-white min-h-screen flex flex-col items-center justify-center py-32 px-4">
      <Helmet>
        <title>FitForge | Payment</title>
      </Helmet>

      <div
        className="bg-white dark:bg-black dark:text-white dark:border-2 dark:border-white/40 shadow-lg rounded-2xl p-8 md:p-10 w-full max-w-lg"
        data-aos="fade-up"
      >
        <h2
          className="text-3xl font-extrabold text-primary text-center mb-6"
          data-aos="zoom-in"
        >
          Secure Payment
        </h2>

        {/* Trainer & Slot Summary */}
        <div
          className="p-5 rounded-lg mb-6 text-gray-800 dark:text-white space-y-4"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <div className="flex items-center gap-4">
            <img
              src={trainer?.profileImage || "https://via.placeholder.com/80"}
              alt={trainer?.fullName}
              className="w-16 h-16 rounded-full object-cover shadow-md"
            />
            <div>
              <h3 className="text-lg font-semibold">{trainer?.fullName}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {trainer?.email}
              </p>
            </div>
          </div>

          <div className="border-t-2 border-gray-600 pt-4">
            <p className="text-primary">
              <span className="font-bold text-black dark:text-white/70">
                Package:
              </span>{" "}
              {packageName}
            </p>
            <p className="text-primary">
              <span className="font-bold text-black dark:text-white/70">
                Selected Class:
              </span>{" "}
              {slot?.selectedClass}
            </p>
            <p className="text-primary">
              <span className="font-bold text-black dark:text-white/70">
                Slot:
              </span>{" "}
              {slot?.slotName}
            </p>
            <p className="text-primary">
              <span className="font-bold text-black dark:text-white/70">
                Duration:
              </span>{" "}
              {slot?.slotTime} Hour
            </p>
            <p className="text-primary">
              <span className="font-bold text-black dark:text-white/70">
                Day:
              </span>{" "}
              {slot?.selectedDay}
            </p>
          </div>
        </div>

        {/* Stripe Payment Form */}
        <div data-aos="fade-up" data-aos-delay="400">
          <Elements stripe={stripePromise}>
            <PaymentForm
              trainer={trainer}
              slot={slot}
              packageName={packageName}
            />
          </Elements>
        </div>

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mt-6 w-full text-gray-600 hover:text-primary font-semibold text-center block transition"
          data-aos="fade-up"
          data-aos-delay="600"
        >
          &larr; Back to Plans
        </button>
      </div>
    </div>
  );
};

export default Payment;
