import { useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/user/login",
        formData,
        {
          withCredentials: true,
        }
      );
      console.log(res);
      window.location.href = "/";
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div
      className="mx-auto"
      style={{
        maxWidth: "400px",
        width: "100%",
        padding: "20px",
        backgroundColor: "transparent",
      }}
    >
      <div className="text-center mb-4">
        <img
          src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
          alt="login icon"
          width="60"
          height="60"
        />
        <h4 className="mt-2">User Login</h4>
      </div>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-4" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            name="password"
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="dark" type="submit" className="w-100">
          Login
        </Button>
      </Form>
    </div>
  );
};

export default Login;
