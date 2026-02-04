const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("src/uploads"));
app.use("/api/auth", require("./services/auth/auth.routes"));
app.use("/api/products", require("./services/product/product.routes"));
app.use("/api/orders", require("./services/order/order.routes"));




app.get("/", (req, res) => {
  res.send("API running...");
});

module.exports = app;
