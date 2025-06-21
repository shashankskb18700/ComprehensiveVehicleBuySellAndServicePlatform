import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Admin from "../../components/auth/admin";

const AdminTransaction = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/admin/transactions",
          {
            withCredentials: true,
          }
        );

        console.log(response);
        setOrders(response.data);
      } catch (err) {
        setError("Could not fetch your order history.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading)
    return (
      <div style={{ textAlign: "center", marginTop: "30px" }}>
        Loading your history...
      </div>
    );
  if (error)
    return (
      <div style={{ textAlign: "center", marginTop: "30px", color: "red" }}>
        {error}
      </div>
    );

  return (
    <div style={{ maxWidth: "1000px", margin: "auto", padding: "20px" }}>
      <h1>Transaction History</h1>
      {orders.length === 0 ? (
        <p>You have not placed any orders yet.</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
          {orders.map((order) => (
            <div
              key={order._id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "20px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderBottom: "1px solid #eee",
                  paddingBottom: "10px",
                  marginBottom: "15px",
                }}
              >
                <div>
                  <strong>Order Placed:</strong>
                  <br />
                  {new Date(order.orderDate).toLocaleDateString()}
                </div>
                <div>
                  <strong>Total:</strong>
                  <br />₹ {order.totalAmount.toLocaleString("en-IN")}
                </div>
                <div>
                  <strong>Order ID:</strong>
                  <br />
                  {order._id}
                </div>
                <Link to={`/order/${order._id}`}>
                  <button style={{ padding: "8px 12px", cursor: "pointer" }}>
                    View Receipt
                  </button>
                </Link>
              </div>
              {order.items.map((item) => (
                <div
                  key={item._id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "15px",
                    marginTop: "10px",
                  }}
                >
                  <img
                    src={item.car.imageUrl}
                    alt={item.car.name}
                    style={{
                      width: "100px",
                      height: "70px",
                      objectFit: "cover",
                      borderRadius: "4px",
                    }}
                  />
                  <div>
                    <strong>{item.car.name}</strong>
                    <br />
                    <span>Qty: {item.quantity}</span>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminTransaction;
