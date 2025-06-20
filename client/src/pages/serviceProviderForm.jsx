import { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import axios from "axios";

const ServiceProviderForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    garageName: "",
    location: "",
    experience: "",
    services: "",
    contact: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/serviceProvider/",
        formData,
        { withCredentials: true }
      );

      console.log(res);
      alert("Service provider registered successfully!");
      console.log("Server Response:", res.data);

      setFormData({
        name: "",
        garageName: "",
        location: "",
        experience: "",
        services: "",
        contact: "",
      });
    } catch (error) {
      console.error("Error submitting service provider:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4">🔧 Become a Service Provider</h2>
      <Form onSubmit={handleSubmit} className="w-75 mx-auto">
        <Form.Group className="mb-3">
          <Form.Label>Your Name</Form.Label>
          <Form.Control name="name" onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Garage/Shop Name</Form.Label>
          <Form.Control name="garageName" onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Location (City/Area)</Form.Label>
          <Form.Control name="location" onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Years of Experience</Form.Label>
          <Form.Control
            name="experience"
            type="number"
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Services Offered</Form.Label>
          <Form.Control
            as="textarea"
            name="services"
            rows={3}
            onChange={handleChange}
            placeholder="e.g., Oil Change, Tire Rotation, AC Service"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Contact Info</Form.Label>
          <Form.Control name="contact" onChange={handleChange} required />
        </Form.Group>

        <Button type="submit" variant="success">
          Submit Application
        </Button>
      </Form>
    </Container>
  );
};

export default ServiceProviderForm;
