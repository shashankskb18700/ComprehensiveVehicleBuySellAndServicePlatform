import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "../../components/car/PaymentForm";

// --- IMPORTANT:Stripe Publishable Key is here ---
const stripePromise = loadStripe(
  "pk_test_51RayilHIM3B9fCNDLt5Hh5FyyOj507d03rhQE0qEvnry7T4idydUhhInv4Ce6rLDLcR3VJ0dzli0dj3dyZmK0Vno00EU9GMtTb"
);

const CheckoutPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // for Stripe's client secret
  const [clientSecret, setClientSecret] = useState("");

  // to store the total amount for display
  const [totalAmount, setTotalAmount] = useState(0);

  // for the user-entered shipping address
  const [address, setAddress] = useState({ line1: "", city: "", pincode: "" });

  // for the selected payment method
  const [paymentMethod, setPaymentMethod] = useState("Card");

  useEffect(() => {
    const itemIds = searchParams.get("items")?.split(",");
    if (!itemIds || itemIds.length === 0) {
      navigate("/cart"); // If no items, redirect to cart
      return;
    }

    const createPaymentIntent = async () => {
      try {
        const { data } = await axios.post(
          "http://localhost:5000/api/payment/create-payment-intent",
          {
            cartItemIds: itemIds,
          },
          {
            withCredentials: true,
          }
        );

        setClientSecret(data.clientSecret);
        setTotalAmount(data.totalAmount);
      } catch (error) {
        console.error("Failed to create payment intent", error);
        navigate("/cart");
      }
    };

    createPaymentIntent();
  }, [searchParams, navigate]);

  const handleAddressChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleSuccessfulPayment = () => {
    navigate("/order-success");
  };

  const appearance = { theme: "stripe" };
  const options = { clientSecret, appearance };

  const orderDetailsForForm = {
    cartItemIds: searchParams.get("items")?.split(","),
    shippingAddress: address,
    paymentMethod: paymentMethod,
  };

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "auto",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1>Checkout</h1>

      <h2>1. Shipping Address</h2>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          padding: "15px",
          border: "1px solid #ddd",
          borderRadius: "8px",
        }}
      >
        <input
          type="text"
          name="line1"
          placeholder="Address"
          onChange={handleAddressChange}
          style={{ padding: "10px" }}
          required
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          onChange={handleAddressChange}
          style={{ padding: "10px" }}
          required
        />
        <input
          type="text"
          name="pincode"
          placeholder="Pincode"
          onChange={handleAddressChange}
          style={{ padding: "10px" }}
          required
        />
      </div>

      <h2 style={{ marginTop: "30px" }}>2. Payment Details</h2>
      <div
        style={{
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "8px",
        }}
      >
        {clientSecret ? (
          <Elements options={options} stripe={stripePromise}>
            <PaymentForm
              orderDetails={orderDetailsForForm}
              totalAmount={totalAmount}
              onPaymentSuccess={handleSuccessfulPayment}
            />
          </Elements>
        ) : (
          <p>Loading payment options...</p>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;
