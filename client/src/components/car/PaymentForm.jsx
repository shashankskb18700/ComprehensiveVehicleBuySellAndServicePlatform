import React, { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";

// This component now accepts an `onPaymentSuccess` function as a prop
const PaymentForm = ({ orderDetails, totalAmount, onPaymentSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const { error: stripeError, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (stripeError) {
      setMessage(stripeError.message);
      setIsProcessing(false);
      return;
    }

    if (paymentIntent && paymentIntent.status === "succeeded") {
      setMessage("Payment Successful! Finalizing your order...");

      try {
        await axios.post("http://localhost:5000/api/orders", orderDetails, {
          withCredentials: true,
        });

        onPaymentSuccess();
      } catch (orderError) {
        setMessage(
          "Payment was successful, but we couldn't place your order. Please contact support."
        );
        console.error(orderError);
        setIsProcessing(false);
      }
    } else {
      setMessage("An unexpected error occurred.");
      setIsProcessing(false);
    }
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />
      <button
        disabled={isProcessing || !stripe || !elements}
        id="submit"
        style={{
          width: "100%",
          padding: "15px",
          marginTop: "30px",
          fontSize: "18px",
          backgroundColor: "#28a745",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        <span id="button-text">
          {isProcessing
            ? "Processing..."
            : `Pay ₹${totalAmount.toLocaleString("en-IN")}`}
        </span>
      </button>
      {message && (
        <div
          id="payment-message"
          style={{
            marginTop: "15px",
            color: message.includes("successful") ? "green" : "red",
          }}
        >
          {message}
        </div>
      )}
    </form>
  );
};

export default PaymentForm;
