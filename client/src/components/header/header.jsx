import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav
      style={{
        padding: "15px",
        background: "#333",
        color: "white",
        display: "flex",
        gap: "20px",
        alignItems: "center",
      }}
    >
      <Link to="/" style={{ color: "white", textDecoration: "none" }}>
        Buy Car
      </Link>
      <Link
        to="/car-listing"
        style={{ color: "white", textDecoration: "none" }}
      >
        Sell Car
      </Link>
      <Link
        to="/book-appointment"
        style={{ color: "white", textDecoration: "none" }}
      >
        Car Maintenance
      </Link>
      <Link to="/cart" style={{ color: "white", textDecoration: "none" }}>
        My Cart
      </Link>
      <Link to="/orders" style={{ color: "white", textDecoration: "none" }}>
        My Orders
      </Link>
      <Link to="/profile">My Profile</Link>
    </nav>
  );
};

export default Header;
