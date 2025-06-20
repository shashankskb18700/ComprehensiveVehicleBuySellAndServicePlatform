import { useState } from "react";

import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTestCarListing = async () => {
    try {
      const res = await axios.get("http://localhost:5000/carListing", {
        withCredentials: true,
      });
      console.log(res);
    } catch (e) {
      console.log("error", e);
    }
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
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="email"
          required
          name="email"
          onChange={handleChange}
        ></input>
        <input
          type="password"
          placeholder="password"
          required
          name="password"
          onChange={handleChange}
        ></input>
        <button>Login </button>
      </form>

      <button onClick={handleTestCarListing}>Carlisting </button>
    </div>
  );
};

export default Login;
