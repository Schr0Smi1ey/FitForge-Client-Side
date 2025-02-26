import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
// import useCart from "../../../hooks/useCart";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { AuthContext } from "../../Contexts/AuthContext/AuthProvider";
import useCustomAxios from "../../Hooks/useCustomAxios";

const PaymentForm = ({ trainer, slot, packageName }) => {
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const customAxios = useCustomAxios();
  const { user } = useContext(AuthContext);
  console.log(trainer, slot, packageName);
  const navigate = useNavigate();
  const totalPrice =
    (packageName === "Basic" && 10) ||
    (packageName === "Standard" && 50) ||
    (packageName === "Premium" && 100);

  useEffect(() => {
    if (totalPrice > 0) {
      //   axiosSecure
      //     .post("/create-payment-intent", { price: totalPrice })
      //     .then((res) => {
      //       console.log(res.data.clientSecret);
      //       setClientSecret(res.data.clientSecret);
      //     });
      customAxios
        .post("/create-payment-intent", { price: totalPrice })
        .then((res) => {
          console.log(res.data.clientSecret);
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [customAxios, totalPrice]);

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
      console.log("payment error", error);
      setError(error.message);
    } else {
      console.log("payment method", paymentMethod);
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
      console.log("confirm error");
    } else {
      console.log("payment intent", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        console.log("transaction id", paymentIntent.id);
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
        const res = await customAxios.post("/payments", payment);
        console.log(res);
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
              color: "#9e2146",
            },
          },
        }}
      />
      <button
        className="btn btn-sm btn-primary my-4"
        type="submit"
        disabled={!stripe || !clientSecret}
      >
        Pay
      </button>
      <p className="text-red-600">{error}</p>
      {/* {transactionId && (
        <p className="text-green-600"> Your transaction id: {transactionId}</p>
      )} */}
    </form>
  );
};

export default PaymentForm;
