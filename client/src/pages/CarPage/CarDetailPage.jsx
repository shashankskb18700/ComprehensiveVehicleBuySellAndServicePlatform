import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const CarDetailPage = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/cars/${id}`,
          {
            withCredentials: true,
          }
        );
        setCar(response.data);
      } catch (err) {
        setError("Failed to fetch car details. The car may not exist.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCarDetails();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/cart/add",
        {
          carId: id,
          quantity: quantity,
        },
        {
          withCredentials: true,
        }
      );
      alert(`${quantity} of "${car.name}" added to cart!`);
    } catch (err) {
      alert("Failed to add car to cart.");
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>Loading...</div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px", color: "red" }}>
        {error}
      </div>
    );
  }

  if (!car) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        Car not found.
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "1000px",
        margin: "auto",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1>{car.name}</h1>
      <div style={{ display: "flex", gap: "30px", flexWrap: "wrap" }}>
        {/* Image Section */}
        <div style={{ flex: "1 1 400px" }}>
          <img
            src={car.imageUrl}
            alt={car.name}
            style={{
              width: "100%",
              height: "auto",
              borderRadius: "8px",
              border: "1px solid #ddd",
            }}
          />
        </div>

        {/* Details Section */}
        <div style={{ flex: "1 1 400px" }}>
          <h2 style={{ color: "#333", fontSize: "2em" }}>
            ₹ {car.price.toLocaleString("en-IN")}
          </h2>

          <div
            style={{
              background: "#f9f9f9",
              padding: "15px",
              borderRadius: "8px",
              marginBottom: "20px",
            }}
          >
            <p>
              <strong>Make:</strong> {car.make}
            </p>
            <p>
              <strong>Model:</strong> {car.model}
            </p>
            <p>
              <strong>Year:</strong> {car.year}
            </p>
            <p>
              <strong>Mileage:</strong> {car.mileage.toLocaleString("en-IN")} km
            </p>
          </div>

          <h3>Description</h3>
          <p>{car.description}</p>

          <h3>Specifications</h3>
          <p>{car.specifications}</p>

          <hr style={{ margin: "20px 0" }} />

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginTop: "20px",
            }}
          >
            <span style={{ fontSize: "16px", fontWeight: "bold" }}>
              Quantity:
            </span>
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              style={{
                padding: "5px 12px",
                fontSize: "18px",
                cursor: "pointer",
                border: "1px solid #ccc",
              }}
            >
              -
            </button>
            <span
              style={{
                fontSize: "18px",
                minWidth: "40px",
                textAlign: "center",
                border: "1px solid #ccc",
                padding: "5px",
                borderRadius: "4px",
              }}
            >
              {quantity}
            </span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              style={{
                padding: "5px 10px",
                fontSize: "18px",
                cursor: "pointer",
                border: "1px solid #ccc",
              }}
            >
              +
            </button>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            style={{
              backgroundColor: "#ff9f00",
              color: "black",
              padding: "15px",
              border: "none",
              fontSize: "18px",
              cursor: "pointer",
              marginTop: "20px",
              width: "100%",
              borderRadius: "8px",
              fontWeight: "bold",
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarDetailPage;
