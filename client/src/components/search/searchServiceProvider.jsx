import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Form, Button, Row, Col, Card } from "react-bootstrap";

const SearchServiceProviders = () => {
  const [location, setLocation] = useState("");
  const [service, setService] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/serviceProvider/search",
        {
          location,
          service,
        },
        { withCredentials: true }
      );

      console.log(res);
      setResults(res.data.providers);
    } catch (err) {
      console.error("Search failed:", err);
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4">🔍 Find Car Maintenance Services</h2>
      <Form onSubmit={handleSearch} className="mb-4">
        <Row>
          <Col md={5}>
            <Form.Control
              type="text"
              placeholder="Enter location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </Col>
          <Col md={5}>
            <Form.Control
              type="text"
              placeholder="Service type (e.g. Oil Change)"
              value={service}
              onChange={(e) => setService(e.target.value)}
            />
          </Col>
          <Col md={2}>
            <Button type="submit" variant="primary" className="w-100">
              Search
            </Button>
          </Col>
        </Row>
      </Form>

      <Row>
        {results.map((provider) => (
          <Col md={4} key={provider._id} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{provider.garageName}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {provider.location}
                </Card.Subtitle>
                <Card.Text>
                  <strong>Services:</strong> {provider.services}
                  <br />
                  <strong>Experience:</strong> {provider.experience} years
                  <br />
                  <strong>Contact:</strong> {provider.contact}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default SearchServiceProviders;
