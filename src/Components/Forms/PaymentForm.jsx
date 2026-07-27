import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { AuthContext } from "../../Contexts/AuthContext/AuthProvider";
import { FaLock } from "react-icons/fa";
import { BRAND } from "../../theme";

const PaymentForm = ({ trainer, slot, packageName }) => {
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const secureAxios = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!packageName || !trainer?._id || !slot?._id) return;
    // trainerId/slotId go to the server so it can stamp them onto the
    // PaymentIntent's metadata — that metadata is what the webhook fulfils from.
    secureAxios
      .post("/create-payment-intent", {
        packageName,
        trainerId: trainer._id,
        slotId: slot._id,
      })
      .then((res) => {
        setClientSecret(res.data.clientSecret);
      })
      .catch(() => {
        setError("Could not start payment. Please try again.");
      });
  }, [secureAxios, packageName, trainer?._id, slot?._id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    const { error } = await stripe.createPaymentMethod({
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

        // The booking is recorded by the Stripe webhook, not by this request.
        // Stripe has confirmed the charge, so the payment HAS succeeded — we just
        // poll briefly to see whether fulfilment has landed, since webhook
        // delivery is asynchronous and usually takes a moment.
        let fulfilled = false;
        for (let attempt = 0; attempt < 5 && !fulfilled; attempt++) {
          if (attempt > 0) await new Promise((r) => setTimeout(r, 1000));
          try {
            const res = await secureAxios.post(
              "/payments",
              { transactionId: paymentIntent.id },
              { params: { email: user.email } }
            );
            fulfilled = Boolean(res.data?.fulfilled);
          } catch {
            // Polling is best-effort; the payment already went through.
          }
        }

        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your payment has been successful",
          // Never tell someone their booking failed when their card was charged.
          text: fulfilled
            ? "Your slot is booked."
            : "Your booking is being confirmed and will appear shortly.",
          showConfirmButton: false,
          timer: 2000,
        });
        navigate("/");
      }
    }
  };
  return (
    <form className="pt-32 container mx-auto" onSubmit={handleSubmit}>
      <div className="bg-gray-100 dark:bg-black dark:text-white p-4 rounded-lg">
        <CardElement
          // Stripe renders CardElement inside a cross-origin iframe, so it cannot
          // read our stylesheet — these must be literal colour values passed as
          // config. #424770 and #aab7c4 are Stripe's own documented defaults.
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
                color: BRAND.danger,
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
