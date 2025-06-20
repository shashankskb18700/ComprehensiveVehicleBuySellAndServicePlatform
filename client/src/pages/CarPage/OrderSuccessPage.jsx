import React from "react";
import { Link } from "react-router-dom";

const OrderSuccessPage = () => {
  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "50px auto",
        padding: "40px",
        textAlign: "center",
        border: "1px solid #ddd",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      }}
    >
      <h1 style={{ color: "#28a745" }}>✓ Order Placed Successfully!</h1>
      <p style={{ fontSize: "1.1em", color: "#555" }}>
        Thank you for your purchase. You can view your order details in the "My
        Orders" section.
      </p>
      <p>A confirmation has been sent to your registered email address.</p>
      <Link to="/">
        <button
          style={{
            padding: "12px 25px",
            fontSize: "16px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginTop: "20px",
          }}
        >
          Continue Shopping
        </button>
      </Link>
    </div>
  );
};

export default OrderSuccessPage;
