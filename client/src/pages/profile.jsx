import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [myCars, setMyCars] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProfileData = async () => {
    try {
      const userRes = await axios.get("http://localhost:5000/user/profile", {
        withCredentials: true,
      });

      const carsRes = await axios.get("http://localhost:5000/myCarListing", {
        withCredentials: true,
      });

      setUser(userRes.data);
      setMyCars(carsRes.data);
    } catch (error) {
      console.error("Error loading profile data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/user/logout",
        {},
        { withCredentials: true }
      );
      window.location.href = "/"; // Redirect to home or auth page
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "40px" }}>Loading...</div>
    );
  }

  return (
    <div style={{ maxWidth: "900px", margin: "auto", padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>👤 My Profile</h1>
        <button
          onClick={handleLogout}
          style={{
            backgroundColor: "#dc3545",
            color: "white",
            border: "none",
            padding: "8px 16px",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>

      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "15px",
          marginBottom: "30px",
        }}
      >
        <p>
          <strong>Name:</strong> {user?.name}
        </p>
        <p>
          <strong>Email:</strong> {user?.email}
        </p>
        <p>
          <strong>Role:</strong> {user?.role}
        </p>
      </div>

      <h2>🚗 My Car Listings</h2>
      {myCars.length === 0 ? (
        <p>You have not listed any cars yet.</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          {myCars.map((car) => (
            <div
              key={car._id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "6px",
                padding: "15px",
              }}
            >
              <h4>
                {car.make} {car.model} ({car.year})
              </h4>
              <p>
                <strong>Price:</strong> ₹{car.price.toLocaleString("en-IN")}
              </p>
              <p>
                <strong>Condition:</strong> {car.condition}
              </p>
              <p>
                <strong>Mileage:</strong> {car.mileage} km
              </p>
              {car.imageUrl && (
                <img
                  src={car.imageUrl}
                  alt="Car"
                  style={{
                    width: "150px",
                    borderRadius: "4px",
                    marginTop: "10px",
                  }}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;
