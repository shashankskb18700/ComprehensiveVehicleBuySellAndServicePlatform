import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";

import Signup from "./components/auth/signup";
import Login from "./components/auth/login";
import Auth from "./pages/auth";
import AdminDashboard from "./pages/adminDashBoard";
import CarListingAndSelling from "./pages/carListingAndSelling";
import ServiceProviderForm from "./pages/serviceProviderForm";

import BookAppointment from "./pages/bookAppointment";
import "./App.css";

import SearchServiceProviders from "./components/search/searchServiceProvider";

import CarListPage from "./pages/CarPage/CarLIstPage";
import CarDetailPage from "./pages/CarPage/CarDetailPage";
import CartPage from "./pages/CarPage/CartPage";
import CheckoutPage from "./pages/CarPage/CheckoutPage";
import OrderSuccessPage from "./pages/CarPage/OrderSuccessPage";
import MyOrdersPage from "./pages/CarPage/MyOrdersPage";
import ReceiptPage from "./pages/CarPage/ReceiptPage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      {/* <Signup></Signup>
      <Login></Login> */}
      {/* <Auth></Auth> */}
      {/* <AdminDashboard></AdminDashboard> */}
      {/* <CarListingAndSelling></CarListingAndSelling> */}
      {/* <ServiceProviderForm></ServiceProviderForm> */}
      {/* <BookAppointment></BookAppointment> */}

      {/* <SearchServiceProviders></SearchServiceProviders> */}
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
        <Link
          to="/"
          style={{ color: "white", textDecoration: "none", fontSize: "1.1em" }}
        >
          Home
        </Link>
        <Link
          to="/cart"
          style={{ color: "white", textDecoration: "none", fontSize: "1.1em" }}
        >
          My Cart
        </Link>
        <Link
          to="/orders"
          style={{ color: "white", textDecoration: "none", fontSize: "1.1em" }}
        >
          My Orders
        </Link>
      </nav>

      <Routes>
        <Route path="/" element={<CarListPage />} />
        <Route path="/car/:id" element={<CarDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order-success" element={<OrderSuccessPage />} />
        <Route path="/orders" element={<MyOrdersPage />} />
        <Route path="/order/:id" element={<ReceiptPage />} />
      </Routes>
    </div>
  );
}

export default App;
