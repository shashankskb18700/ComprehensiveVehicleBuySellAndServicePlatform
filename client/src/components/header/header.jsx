import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav
      style={{
        padding: "12px 30px",
        backgroundColor: "#111",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
        position: "sticky",
        top: 0,
        zIndex: 999,
      }}
    >
      <div
        style={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          color: "rgb(10,109,250)",
        }}
      >
        Wipro Cars
      </div>

      <div style={{ display: "flex", gap: "20px" }}>
        <Link to="/" style={navLinkStyle}>
          Buy Car
        </Link>
        <Link to="/car-listing" style={navLinkStyle}>
          Sell Car
        </Link>
        <Link to="/book-appointment" style={navLinkStyle}>
          Car Maintenance
        </Link>
        <Link to="/cart" style={navLinkStyle}>
          My Cart
        </Link>
        <Link to="/orders" style={navLinkStyle}>
          My Orders
        </Link>
        <Link to="/profile" style={navLinkStyle}>
          My Profile
        </Link>
      </div>
    </nav>
  );
};

const navLinkStyle = {
  color: "white",
  textDecoration: "none",
  fontSize: "1rem",
  padding: "6px 10px",
  transition: "color 0.3s",
  fontWeight: "500",
};

export default Header;
