import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/admin/login",
        formData,
        {
          withCredentials: true,
        }
      );

      console.log(res);
      window.location.href = "/";
    } catch (err) {
      console.error("Login error:", err);
      setError("Login failed or unauthorized.");
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
          alt="admin icon"
          width="60"
          height="60"
        />
        <h4 className="mt-2">Admin Login</h4>
      </div>

      <form onSubmit={handleAdminLogin}>
        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="Enter admin email"
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label>Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Enter password"
            onChange={handleChange}
            required
          />
        </div>

        {error && (
          <div className="alert alert-danger py-2 text-center">{error}</div>
        )}

        <button className="btn btn-dark w-100" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Admin;
