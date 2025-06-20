import { Routes, Route, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import Auth from "./pages/auth";

import CarListPage from "./pages/CarPage/CarLIstPage";
import CarDetailPage from "./pages/CarPage/CarDetailPage";
import CartPage from "./pages/CarPage/CartPage";
import CheckoutPage from "./pages/CarPage/CheckoutPage";
import OrderSuccessPage from "./pages/CarPage/OrderSuccessPage";
import MyOrdersPage from "./pages/CarPage/MyOrdersPage";
import ReceiptPage from "./pages/CarPage/ReceiptPage";
import CarListingAndSelling from "./pages/carListingAndSelling";
import ServiceProviderForm from "./pages/serviceProviderForm";
import BookAppointment from "./pages/bookAppointment";
import Profile from "./pages/profile";
import ProtectedRoute from "./components/protectedRoutes/protectedRoutes";
import Header from "./components/header/header";

function App() {
  const token = Cookies.get("token");

  return (
    <div>
      {!token && (
        <Routes>
          <Route path="/*" element={<Auth />} />
        </Routes>
      )}

      {token && (
        <>
          <Header />
          <Routes>
            <Route path="/" element={<CarListPage />} />
            <Route path="/car/:id" element={<CarDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order-success" element={<OrderSuccessPage />} />
            <Route path="/orders" element={<MyOrdersPage />} />
            <Route path="/order/:id" element={<ReceiptPage />} />
            <Route path="/car-listing" element={<CarListingAndSelling />} />
            <Route path="/book-appointment" element={<BookAppointment />} />
            <Route path="/services" element={<ServiceProviderForm />} />
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </>
      )}
    </div>
  );
}

export default App;
