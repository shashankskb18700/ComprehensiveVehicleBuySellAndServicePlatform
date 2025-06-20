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
    } catch (err) {
      console.error("Login error:", err);
      setError("Login failed or unauthorized.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-3">👨‍💼 Admin Login</h2>
      <form onSubmit={handleAdminLogin} className="w-50">
        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <button className="btn btn-dark w-100" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Admin;
