import { useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";
import axios from "axios";

const BookAppointment = () => {
  const [formData, setFormData] = useState({
    preferredDate: "",
    preferredTime: "",
    issueDescription: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/appointmentRoutes",
        {
          ...formData,
        },
        {
          withCredentials: true,
        }
      );

      alert("Appointment booked successfully!");
      console.log("Server Response:", res.data);

      // Reset form
      setFormData({
        preferredDate: "",
        preferredTime: "",
        issueDescription: "",
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="mb-4">📅 Book Appointment</h2>
      <Form onSubmit={handleSubmit} className="w-75 mx-auto">
        <Form.Group className="mb-3">
          <Form.Label>Preferred Date</Form.Label>
          <Form.Control
            type="date"
            name="preferredDate"
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Preferred Time</Form.Label>
          <Form.Control
            type="time"
            name="preferredTime"
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Describe Your Car Issue</Form.Label>
          <Form.Control
            as="textarea"
            name="issueDescription"
            rows={4}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button type="submit" variant="primary">
          Book Appointment
        </Button>
      </Form>
    </Container>
  );
};

export default BookAppointment;
