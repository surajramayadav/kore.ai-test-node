
const express = require("express");
const app = express();
const errorMiddleware = require("./middleware/error");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const customer = require("./route/customerRoute"), customerAuth = require("./route/customerAuthRoute"), product = require("./route/productRoute"), order = require("./route/orderRoute")

corsOptions = {
  // origin: "http://localhost:8081",
  origin: "*",
  credentials: true,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(fileUpload({ useTempFiles: false }));
app.use(express.static(__dirname + "/upload"));

app.use("/api/v1/customer", customer)
app.use("/api/v1/customer/auth", customerAuth)
app.use("/api/v1/product", product)
app.use("/api/v1/order", order)

app.get("/", (req, res) => {
  res.send("welcome to dairy milk backend")
});
// Middleware For error
app.use(errorMiddleware);

module.exports = app;
