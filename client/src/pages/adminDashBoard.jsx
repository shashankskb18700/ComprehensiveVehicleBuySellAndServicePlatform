import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";

const features = [
  {
    title: "User Management",
    route: "/admin/users",
    description: "Manage registered users.",
  },
  {
    title: "Car Listings",
    route: "/admin/listings",
    description: "Approve or remove listings.",
  },
  {
    title: "Service Providers",
    route: "/admin/providers",
    description: "Manage garages/mechanics.",
  },
  {
    title: "Reviews & Ratings",
    route: "/admin/reviews",
    description: "Moderate reviews.",
  },
  {
    title: "Price Estimator",
    route: "/admin/price-tool",
    description: "Edit estimation parameters.",
  },
  {
    title: "Transactions",
    route: "/admin/transactions",
    description: "View all payments and receipts.",
  },
  {
    title: "Analytics & Reports",
    route: "/admin/analytics",
    description: "Track platform stats.",
  },
  {
    title: "Send Notifications",
    route: "/admin/notify",
    description: "Broadcast alerts or offers.",
  },
];

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">👨‍💼 Admin Dashboard</h2>
      <Row xs={1} md={2} lg={4} className="g-4">
        {features.map((item, idx) => (
          <Col key={idx}>
            <Card
              className="h-100 shadow-sm border-0 hoverable"
              onClick={() => navigate(item.route)}
              style={{ cursor: "pointer" }}
            >
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Card.Text>{item.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default AdminDashboard;
