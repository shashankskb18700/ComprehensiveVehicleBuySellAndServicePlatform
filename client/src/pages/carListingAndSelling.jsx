import { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import axios from "axios";

const CarListingAndSelling = () => {
  const [formData, setFormData] = useState({
    name: "",
    make: "",
    model: "",
    year: "",
    mileage: "",
    condition: "",
    description: "",
    specifications: "",
    imageUrl: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/carListing",
        formData,
        {
          withCredentials: true,
        }
      );

      alert("Car listed successfully!");
      console.log("Server response:", res.data);

      setFormData({
        name: "",
        make: "",
        model: "",
        year: "",
        mileage: "",
        condition: "",
        description: "",
        specifications: "",
        imageUrl: "",
      });
    } catch (err) {
      console.error("Error submitting car listing:", err);
      alert("Something went wrong while submitting.");
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4">📋 List Your Car for Sale</h2>
      <Form onSubmit={handleSubmit} className="w-75 mx-auto">
        <Form.Group className="mb-3">
          <Form.Label>Display Name</Form.Label>
          <Form.Control
            name="name"
            placeholder="e.g. Honda City ZX 2020"
            onChange={handleChange}
            value={formData.name}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Make</Form.Label>
          <Form.Control
            name="make"
            onChange={handleChange}
            value={formData.make}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Model</Form.Label>
          <Form.Control
            name="model"
            onChange={handleChange}
            value={formData.model}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Year</Form.Label>
          <Form.Control
            name="year"
            type="number"
            onChange={handleChange}
            value={formData.year}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Mileage (km)</Form.Label>
          <Form.Control
            name="mileage"
            type="number"
            onChange={handleChange}
            value={formData.mileage}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Condition</Form.Label>
          <Form.Select
            name="condition"
            onChange={handleChange}
            value={formData.condition}
            required
          >
            <option value="">Select condition</option>
            <option value="Excellent">Excellent</option>
            <option value="Good">Good</option>
            <option value="Fair">Fair</option>
            <option value="Poor">Poor</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description (optional)</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            rows={3}
            onChange={handleChange}
            value={formData.description}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Specifications</Form.Label>
          <Form.Control
            as="textarea"
            name="specifications"
            rows={3}
            onChange={handleChange}
            value={formData.specifications}
            placeholder="e.g., Engine: 1.5L i-VTEC, Transmission: Automatic"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Image URL</Form.Label>
          <Form.Control
            name="imageUrl"
            onChange={handleChange}
            value={formData.imageUrl}
            placeholder="e.g., https://images.com/honda-city.jpg"
          />
        </Form.Group>

        <Button type="submit" variant="primary">
          Submit Listing
        </Button>
      </Form>
    </Container>
  );
};

export default CarListingAndSelling;
