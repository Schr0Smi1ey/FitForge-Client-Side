import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { AuthContext } from "../../Contexts/AuthContext/AuthProvider";
import { FaLock } from "react-icons/fa";

const PaymentForm = ({ trainer, slot, packageName }) => {
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const secureAxios = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const totalPrice =
    (packageName === "Basic" && 10) ||
    (packageName === "Standard" && 50) ||
    (packageName === "Premium" && 100);

  useEffect(() => {
    if (totalPrice > 0) {
      secureAxios
        .post("/create-payment-intent", { price: totalPrice })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [secureAxios, totalPrice]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
    } else {
      setError("");
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      setError(confirmError.message);
    } else {
      if (paymentIntent.status === "succeeded") {
        setTransactionId(paymentIntent.id);

        const payment = {
          email: user.email,
          price: totalPrice,
          transactionId: paymentIntent.id,
          date: new Date().toISOString(),
          packageName,
          trainerId: trainer._id,
          slotId: slot._id,
        };
        const res = await secureAxios.post("/payments", payment, {
          params: { email: user.email },
        });
        if (res.data?.insertedId) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Your payment has been successful",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/");
        }
      }
    }
  };
  return (
    <form className="pt-32 container mx-auto" onSubmit={handleSubmit}>
      <div className="bg-gray-100 dark:bg-black dark:text-white p-4 rounded-lg">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#ff4d4d",
              },
            },
          }}
          className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 transition"
        />
      </div>

      {/* Pay Button */}
      <button
        type="submit"
        disabled={!stripe || !clientSecret}
        className={`w-full flex items-center justify-center gap-2 px-6 py-3 text-lg font-medium rounded-lg transition-all shadow-md 
        ${
          stripe && clientSecret
            ? "bg-primary-500 hover:bg-primary-600 text-white"
            : "bg-gray-300 dark:bg-gray-700 text-gray-400 cursor-not-allowed"
        }`}
      >
        <FaLock className="w-5 h-5" />
        Pay Securely
      </button>
      <p className="text-red-600">{error}</p>
    </form>
  );
};

export default PaymentForm;
