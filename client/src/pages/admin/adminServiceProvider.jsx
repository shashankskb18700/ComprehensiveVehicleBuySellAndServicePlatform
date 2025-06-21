import { useEffect, useState } from "react";
import axios from "axios";

const AdminServiceProviders = () => {
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/admin/providers", { withCredentials: true })
      .then((res) => {
        setProviders(res.data);
        console.log(res.data);
      })
      .catch((err) => console.error("Error fetching service providers:", err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>🛠️ Service Provider Management</h2>
      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Experience</th>
            <th>Services</th>
          </tr>
        </thead>
        <tbody>
          {providers.map((p) => (
            <tr key={p._id}>
              <td>{p.name}</td>
              <td>{p.location}</td>
              <td>{p.experience} yrs</td>
              <td>{p.services}</td>
              <td>{p.contact}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminServiceProviders;
