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
    </div>
  );
};

export default Login;
