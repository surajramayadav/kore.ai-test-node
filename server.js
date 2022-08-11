const app = require("./app");
const dotenv = require("dotenv");

process.on("uncaughtException", (err) => {
  console.log("Error : ", err.message);
  console.log("Shutting down the server due to Uncaught Exception");
  process.exit(1);
});

// config
dotenv.config({ path: "./config/config.env" });

//Connecting Database
const ConnectDatabase = require("./config/database");
const { Server } = require("http");

ConnectDatabase();

const PORT = process.env.PORT_PRO;
const server = app.listen(PORT, () => {
  console.log("server is working on http://localhost:", PORT);
});

// UnHandled Promise Rejection

process.on("unhandledRejection", (err) => {
  console.log("Error : ", err.message);
  console.log("Shutting down the server due to Unhandled Promise Rejection");

  server.close(() => {
    process.exit(1);
  });
});
