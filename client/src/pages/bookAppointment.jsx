import { useState } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import axios from "axios";
import SearchServiceProviders from "../components/search/searchServiceProvider";
import { ToastContainer, toast } from "react-toastify";

const BookAppointment = () => {
  const [formData, setFormData] = useState({
    preferredDate: "",
    preferredTime: "",
    issueDescription: "",
  });
  const notify = (e) => toast(e);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/appointmentRoutes",
        formData,
        {
          withCredentials: true,
        }
      );

      notify("Appointment booked successfully!");

      console.log("Server Response:", res.data);

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
    <div>
      <Container className="mt-5 mb-5">
        <Card className="shadow-sm border-0 mb-4 p-4 bg-light">
          <SearchServiceProviders />
        </Card>

        <Card className="shadow border-0 p-4">
          <h2 className="text-center mb-4">📅 Book an Appointment</h2>

          <Form onSubmit={handleSubmit} className="w-100">
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Preferred Date</Form.Label>
              <Form.Control
                type="date"
                name="preferredDate"
                value={formData.preferredDate}
                onChange={handleChange}
                required
                className="shadow-sm"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Preferred Time</Form.Label>
              <Form.Control
                type="time"
                name="preferredTime"
                value={formData.preferredTime}
                onChange={handleChange}
                required
                className="shadow-sm"
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label className="fw-semibold">
                Describe the Issue
              </Form.Label>
              <Form.Control
                as="textarea"
                name="issueDescription"
                rows={4}
                value={formData.issueDescription}
                onChange={handleChange}
                placeholder="E.g. strange engine noise, tire pressure low, etc."
                required
                className="shadow-sm"
              />
            </Form.Group>

            <div className="d-grid">
              <Button variant="primary" size="lg" type="submit">
                Book Appointment
              </Button>
            </div>
          </Form>
        </Card>
      </Container>
      <ToastContainer />
    </div>
  );
};

export default BookAppointment;
