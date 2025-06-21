import { useState } from "react";
import { Button, Container, Row, Col, Card } from "react-bootstrap";
import Login from "../components/auth/login";
import Signup from "../components/auth/signup";
import Admin from "../components/auth/admin";
import "./styles/auth.css";

const Auth = () => {
  const [mode, setMode] = useState(null);
  const [loginType, setLoginType] = useState(null);

  return (
    <Container fluid className="vh-100 bg-light">
      <Row className="h-100">
        <Col
          md={6}
          className="auth-left position-relative text-white authLeft"
          style={{
            backgroundImage: `url("../assets/carD.jpeg")`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundColor: "black",
          }}
        >
          <div
            className="position-absolute w-100 text-center px-3"
            style={{ top: "30px", zIndex: 2 }}
          >
            <h1
              className="display-4 fw-bold"
              style={{ color: "rgb(10,109,250)" }}
            >
              Wipro Cars
            </h1>
            <p style={{ fontSize: "18px", color: "rgb(50,109,250)" }}>
              Buy, Sell & Service with Trust
            </p>
          </div>
        </Col>

        <Col
          md={6}
          className="d-flex justify-content-center align-items-center bg-light"
        >
          <Card
            className="shadow p-4"
            style={{ width: "100%", maxWidth: "420px" }}
          >
            {!mode && (
              <>
                <h3 className="text-center mb-4">Welcome</h3>
                <Button
                  variant="primary"
                  className="mb-3 w-100"
                  onClick={() => setMode("login")}
                >
                  Login
                </Button>
                <Button
                  variant="outline-primary"
                  className="w-100"
                  onClick={() => setMode("signup")}
                >
                  Signup
                </Button>
              </>
            )}

            {mode === "login" && !loginType && (
              <>
                <h4 className="text-center mb-3">Login As</h4>
                <Button
                  className="mb-2 w-100"
                  onClick={() => setLoginType("user")}
                >
                  User
                </Button>
                <Button
                  variant="secondary"
                  className="w-100"
                  onClick={() => setLoginType("admin")}
                >
                  Admin
                </Button>
                <Button
                  variant="link"
                  className="mt-3 d-block text-center"
                  onClick={() => setMode(null)}
                >
                  ⬅ Back
                </Button>
              </>
            )}

            {mode === "login" && loginType === "user" && (
              <>
                <Login />
                <Button
                  variant="link"
                  className="mt-3 d-block text-center"
                  onClick={() => setLoginType(null)}
                >
                  ⬅ Back
                </Button>
              </>
            )}

            {mode === "login" && loginType === "admin" && (
              <>
                <Admin />
                <Button
                  variant="link"
                  className="mt-3 d-block text-center"
                  onClick={() => setLoginType(null)}
                >
                  ⬅ Back
                </Button>
              </>
            )}

            {mode === "signup" && (
              <>
                <Signup />
                <Button
                  variant="link"
                  className="mt-3 d-block text-center"
                  onClick={() => setMode(null)}
                >
                  ⬅ Back
                </Button>
              </>
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Auth;
