import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/cart", {
          withCredentials: true,
        });
        setCartItems(response.data);

        const allItemIds = response.data.map((item) => item._id);
        setSelectedItems(allItemIds);
      } catch (err) {
        setError("Could not fetch cart items.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCartItems();
  }, []);

  const handleRemoveFromCart = async (cartItemId) => {
    try {
      await axios.delete(`http://localhost:5000/api/cart/${cartItemId}`, {
        withCredentials: true,
      });
      setCartItems((currentItems) =>
        currentItems.filter((item) => item._id !== cartItemId)
      );
      setSelectedItems((currentSelected) =>
        currentSelected.filter((id) => id !== cartItemId)
      );
    } catch (error) {
      alert("Failed to remove item.");
      console.error(error);
    }
  };

  const handleSelectItem = (cartItemId) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(cartItemId)
        ? prevSelected.filter((id) => id !== cartItemId)
        : [...prevSelected, cartItemId]
    );
  };

  const handleProceedToBuy = () => {
    if (selectedItems.length > 0) {
      navigate(`/checkout?items=${selectedItems.join(",")}`);
    } else {
      alert("Please select at least one item to proceed.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const subtotal = cartItems
    .filter((item) => selectedItems.includes(item._id))
    .reduce((total, item) => total + item.carId.price * item.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>Your cart is empty.</h2>
        <Link to="/">Go find some cars!</Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "900px", margin: "auto", padding: "20px" }}>
      <h1>Your Shopping Cart</h1>
      <div
        style={{
          background: "#f0f2f2",
          padding: "15px",
          borderRadius: "8px",
          marginBottom: "20px",
        }}
      >
        <h3>
          Subtotal ({selectedItems.length} items):
          <span style={{ fontWeight: "bold" }}>
            {" "}
            ₹ {subtotal.toLocaleString("en-IN")}
          </span>
        </h3>
        <button
          onClick={handleProceedToBuy}
          disabled={selectedItems.length === 0}
          style={{
            width: "100%",
            padding: "12px",
            fontSize: "16px",
            backgroundColor: "#ffd814",
            border: "1px solid #fcd200",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Proceed to Buy
        </button>
      </div>

      <div style={{ border: "1px solid #ddd", borderRadius: "8px" }}>
        {cartItems.map((item) => (
          <div
            key={item._id}
            style={{
              display: "flex",
              alignItems: "center",
              borderBottom: "1px solid #eee",
              padding: "15px",
              gap: "15px",
            }}
          >
            <input
              type="checkbox"
              checked={selectedItems.includes(item._id)}
              onChange={() => handleSelectItem(item._id)}
              style={{ width: "20px", height: "20px", alignSelf: "center" }}
            />
            <img
              src={item.carId.imageUrl}
              alt={item.carId.name}
              style={{
                width: "120px",
                height: "80px",
                objectFit: "cover",
                borderRadius: "4px",
              }}
            />
            <div style={{ flex: 1 }}>
              <h4 style={{ margin: 0 }}>{item.carId.name}</h4>
              <p style={{ margin: "5px 0", color: "#555" }}>
                Qty: {item.quantity}
              </p>
              <button
                onClick={() => handleRemoveFromCart(item._id)}
                style={{
                  background: "none",
                  border: "none",
                  color: "red",
                  cursor: "pointer",
                  padding: "0",
                  textDecoration: "underline",
                }}
              >
                Remove
              </button>
            </div>
            <div style={{ fontWeight: "bold", fontSize: "1.1em" }}>
              ₹ {(item.carId.price * item.quantity).toLocaleString("en-IN")}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartPage;
