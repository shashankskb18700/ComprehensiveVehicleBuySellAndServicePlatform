import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const notify = (e) =>
    toast(`${e}! 🎉 You're all set — please log in to continue.`);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/user/signup",
        formData
      );
      notify(res.data.msg);

      console.log(res);
    } catch (err) {
      console.error(err);
      alert("Signup failed");
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
          src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
          alt="signup icon"
          width="60"
          height="60"
        />
        <h4 className="mt-2">Create Account</h4>
      </div>

      <form onSubmit={handleSignup}>
        <div className="mb-3">
          <label>Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Enter full name"
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="Enter email"
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

        <button type="submit" className="btn btn-dark w-100">
          Sign Up
        </button>
      </form>

      <ToastContainer />
    </div>
  );
};

export default Signup;
