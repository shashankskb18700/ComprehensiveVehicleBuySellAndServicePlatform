// src/pages/Auth.jsx
import { useState } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import Login from "../components/auth/login";
import Signup from "../components/auth/signup";
import Admin from "../components/auth/admin";

const Auth = () => {
  const [mode, setMode] = useState(null); // login or signup
  const [loginType, setLoginType] = useState(null); // user or admin

  return (
    <Container fluid className="vh-100 bg-light">
      <Row className="h-100">
        <Col
          md={6}
          className="bg-dark text-white d-flex flex-column justify-content-center align-items-center"
        >
          <h1 className="display-4 mb-3">🚗 Vehicle Platform</h1>
          <p className="text-center">
            Buy, Sell, and Service Vehicles with Ease
          </p>
        </Col>

        <Col
          md={6}
          className="d-flex flex-column justify-content-center align-items-center"
        >
          {!mode && (
            <>
              <h2 className="mb-4">Welcome</h2>
              <Button
                variant="primary"
                className="mb-3 w-50"
                onClick={() => setMode("login")}
              >
                Login
              </Button>
              <Button
                variant="outline-primary"
                className="w-50"
                onClick={() => setMode("signup")}
              >
                Signup
              </Button>
            </>
          )}

          {mode === "login" && !loginType && (
            <>
              <h4 className="mb-3">Login As</h4>
              <Button
                className="mb-2 w-50"
                onClick={() => setLoginType("user")}
              >
                User
              </Button>
              <Button
                variant="secondary"
                className="w-50"
                onClick={() => setLoginType("admin")}
              >
                Admin
              </Button>
              <Button
                variant="link"
                className="mt-3"
                onClick={() => setMode(null)}
              >
                ⬅ Back
              </Button>
            </>
          )}

          {mode === "login" && loginType === "user" && (
            <>
              <Login />
              <Button variant="link" onClick={() => setLoginType(null)}>
                ⬅ Back
              </Button>
            </>
          )}

          {mode === "login" && loginType === "admin" && (
            <>
              <Admin />
              <Button variant="link" onClick={() => setLoginType(null)}>
                ⬅ Back
              </Button>
            </>
          )}

          {mode === "signup" && (
            <>
              <Signup />
              <Button variant="link" onClick={() => setMode(null)}>
                ⬅ Back
              </Button>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Auth;
