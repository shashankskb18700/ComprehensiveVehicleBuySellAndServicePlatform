const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const {
  checkForAuthentication,
  approveTo,
} = require("./middleware/auth.middleware");

const CONNECT_TO_DB = require("./config/db.config");

const userRoutes = require("./routes/user.route");

const adminRoutes = require("./routes/admin.route");
const carListingRoutes = require("./routes/carListing.route");
const myCarListingRoutes = require("./routes/myCarListing.route");
const serviceProviderRoute = require("./routes/serviceProvider.route");

const appointmentRoutes = require("./routes/appointment.route");
const carRoutes = require("./routes/car.route");
const cartRoutes = require("./routes/cart.route");
const paymentRoutes = require("./routes/payment.route");
const orderRoutes = require("./routes/order.route");

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthentication);

app.use("/user", userRoutes);
app.use("/admin", adminRoutes);

app.use("/carListing", approveTo(["ADMIN", "NORMAL"]), carListingRoutes); // carlisting will only be available for logged in user

app.use(
  "/serviceProvider",
  approveTo(["ADMIN", "NORMAL"]),
  serviceProviderRoute
);
app.use("/appointmentRoutes", appointmentRoutes);
app.use("/myCarListing", myCarListingRoutes);

app.use("/api/cars", approveTo(["ADMIN", "NORMAL"]), carRoutes);
app.use("/api/cart", approveTo(["ADMIN", "NORMAL"]), cartRoutes);
app.use("/api/payment", approveTo(["ADMIN", "NORMAL"]), paymentRoutes);
app.use("/api/orders", approveTo(["ADMIN", "NORMAL"]), orderRoutes);

app.listen(5000, () => {
  console.log("server is on ");
  CONNECT_TO_DB();
});
