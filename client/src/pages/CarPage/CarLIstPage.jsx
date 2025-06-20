import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./CarListPage.css";

const CarListPage = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [filters, setFilters] = useState({
    make: "",
    model: "",
    year: "",
    minPrice: "",
    maxPrice: "",
  });
  const [sortBy, setSortBy] = useState("");

  const fetchCars = async () => {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams();
      for (const key in filters) {
        if (filters[key]) {
          params.append(key, filters[key]);
        }
      }
      if (sortBy) {
        params.append("sortBy", sortBy);
      }

      const response = await axios.get("http://localhost:5000/api/cars", {
        params,
        withCredentials: true,
      });
      setCars(response.data);
    } catch (err) {
      setError(
        "Could not fetch cars. Please check the connection to the server."
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);
  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    fetchCars();
  };

  return (
    <div className="car-list-page">
      <h1>Car Marketplace</h1>

      <div className="controls-section">
        {/* Filter Form */}
        <form className="form-section" onSubmit={handleFormSubmit}>
          <h4>Filter By</h4>
          <input
            name="make"
            placeholder="Make"
            value={filters.make}
            onChange={handleFilterChange}
          />
          <input
            name="model"
            placeholder="Model"
            value={filters.model}
            onChange={handleFilterChange}
          />
          <input
            name="year"
            placeholder="Year"
            value={filters.year}
            onChange={handleFilterChange}
          />
          <input
            name="minPrice"
            placeholder="Min Price"
            value={filters.minPrice}
            onChange={handleFilterChange}
          />
          <input
            name="maxPrice"
            placeholder="Max Price"
            value={filters.maxPrice}
            onChange={handleFilterChange}
          />
          <button type="submit">Submit</button>
        </form>

        {/* Sort Form */}
        <form className="form-section" onSubmit={handleFormSubmit}>
          <h4>Sort By</h4>
          <select value={sortBy} onChange={handleSortChange}>
            <option value="">Select</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="mileage_asc">Mileage: Low to High</option>
          </select>
          <button type="submit">Submit</button>
        </form>
      </div>

      {/* Car Grid Display */}
      {loading ? (
        <div style={{ textAlign: "center", fontSize: "1.2em" }}>
          Loading Cars...
        </div>
      ) : error ? (
        <div style={{ textAlign: "center", color: "red" }}>{error}</div>
      ) : cars.length === 0 ? (
        <div style={{ textAlign: "center" }}>No cars found.</div>
      ) : (
        <div className="cars-grid">
          {cars.map((car) => (
            <Link
              to={`/car/${car._id}`}
              key={car._id}
              className="car-card-link"
            >
              <div className="car-card">
                <img src={car.imageUrl} alt={car.name} className="car-image" />
                <div className="car-content">
                  <div>
                    <div className="car-header">
                      <h3>{car.name}</h3>
                      <span className="car-price">
                        ₹{car.price.toLocaleString("en-IN")}
                      </span>
                    </div>
                    <div className="car-info">
                      <p>
                        <b>Make:</b> {car.make}
                      </p>
                      <p>
                        <b>Model:</b> {car.model}
                      </p>
                      <p>
                        <b>Year:</b> {car.year}
                      </p>
                      <p>
                        <b>Mileage:</b> {car.mileage.toLocaleString("en-IN")} km
                      </p>
                    </div>
                  </div>
                  <p className="car-description">{car.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default CarListPage;
