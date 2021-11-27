const authRoute = require("../routes/auth");
const userRoute = require("../routes/user");
const attendanceRoute = require("../routes/dailyReport");
const monthlyRoute = require("../routes/monthlyReport");

const error = require("../middlewares/error");
const express = require("express");

const routes = (app) => {
  app.use(express.json());
  app.use("/api/auth", authRoute);
  app.use("/api/users", userRoute);
  app.use("/api/report/daily", attendanceRoute);
  app.use("/api/report/monthly", monthlyRoute);

  // error middleware
  app.use(error);
};

module.exports = routes;
