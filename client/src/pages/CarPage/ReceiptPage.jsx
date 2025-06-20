import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const ReceiptPage = () => {
  const { id: orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!orderId) return;
      try {
        const response = await axios.get(
          `http://localhost:5000/api/orders/${orderId}`,
          {
            withCredentials: true,
          }
        );

        setOrder(response.data);
      } catch (err) {
        setError("Could not find the requested order.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrderDetails();
  }, [orderId]);

  if (loading)
    return (
      <div style={{ textAlign: "center", marginTop: "30px" }}>
        Loading Receipt...
      </div>
    );
  if (error)
    return (
      <div style={{ textAlign: "center", marginTop: "30px", color: "red" }}>
        {error}
      </div>
    );
  if (!order)
    return (
      <div style={{ textAlign: "center", marginTop: "30px" }}>
        Order not found.
      </div>
    );

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "40px auto",
        fontFamily: "sans-serif",
        border: "1px solid #ccc",
        padding: "30px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "2px solid #333",
          paddingBottom: "10px",
        }}
      >
        <h1>Transaction Receipt</h1>
        <button
          onClick={() => window.print()}
          style={{ padding: "10px 15px", cursor: "pointer" }}
        >
          Print Receipt
        </button>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "20px",
        }}
      >
        <div>
          <p>
            <strong>Order ID:</strong> {order._id}
          </p>
          <p>
            <strong>Order Date:</strong>{" "}
            {new Date(order.orderDate).toLocaleString()}
          </p>
        </div>
        <div>
          <p>
            <strong>Shipping To:</strong>
          </p>
          <p>
            {order.shippingAddress.line1}
            <br />
            {order.shippingAddress.city}, {order.shippingAddress.pincode}
          </p>
        </div>
      </div>

      <h2
        style={{
          borderTop: "1px solid #eee",
          borderBottom: "1px solid #eee",
          padding: "10px 0",
          marginTop: "20px",
        }}
      >
        Order Summary
      </h2>

      <table
        style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}
      >
        <thead>
          <tr style={{ borderBottom: "1px solid #ccc", textAlign: "left" }}>
            <th style={{ padding: "8px" }}>Item</th>
            <th style={{ padding: "8px" }}>Quantity</th>
            <th style={{ padding: "8px", textAlign: "right" }}>
              Price per Item
            </th>
            <th style={{ padding: "8px", textAlign: "right" }}>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {order.items.map((item) => (
            <tr key={item._id} style={{ borderBottom: "1px solid #eee" }}>
              <td style={{ padding: "8px" }}>{item.car.name}</td>
              <td style={{ padding: "8px" }}>{item.quantity}</td>
              <td style={{ padding: "8px", textAlign: "right" }}>
                ₹ {item.price.toLocaleString("en-IN")}
              </td>
              <td style={{ padding: "8px", textAlign: "right" }}>
                ₹ {(item.price * item.quantity).toLocaleString("en-IN")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: "30px", textAlign: "right" }}>
        <p>
          <strong>Payment Method:</strong> {order.paymentMethod}
        </p>
        <h3 style={{ fontSize: "1.5em" }}>
          Total Amount: ₹ {order.totalAmount.toLocaleString("en-IN")}
        </h3>
      </div>

      <div style={{ marginTop: "40px", textAlign: "center" }}>
        <Link to="/orders">← Back to Order History</Link>
      </div>
    </div>
  );
};

export default ReceiptPage;
