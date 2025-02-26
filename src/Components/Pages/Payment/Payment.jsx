import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "../../Forms/PaymentForm";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet";

// Load Stripe
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { trainer, slot, packageName } = location.state || {};
  return (
    <div>
      <Helmet>
        <title>FitForge | Payment</title>
      </Helmet>
      <h2 className="text-2xl font-bold">Payment for {packageName} Package</h2>
      <Elements stripe={stripePromise}>
        <PaymentForm trainer={trainer} slot={slot} packageName={packageName} />
      </Elements>
    </div>
  );
};

export default Payment;
