import { useEffect, useState } from "react";
import axios from "axios";

const AdminListings = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/admin/listings", { withCredentials: true })
      .then((res) => setCars(res.data))
      .catch((err) => console.error("Error fetching car listings", err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>🚗 All Car Listings</h2>
      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>Make</th>
            <th>Model</th>
            <th>Year</th>
            <th>Price</th>
            <th>Mileage</th>
            <th>Condition</th>
            <th>Owner ID</th>
          </tr>
        </thead>
        <tbody>
          {cars.map((car) => (
            <tr key={car._id}>
              <td>{car.make}</td>
              <td>{car.model}</td>
              <td>{car.year}</td>
              <td>₹ {car.price?.toLocaleString("en-IN")}</td>
              <td>{car.mileage} km</td>
              <td>{car.condition}</td>
              <td>{car.owner}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminListings;
