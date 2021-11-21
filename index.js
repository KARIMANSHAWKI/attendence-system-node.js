const express = require("express");
const helmet = require("helmet");
var morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// load routes
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");

// init app
const app = express();

// load config
dotenv.config({ path: "./config/config.env" });

// middleware
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

// connect to db
connectDB();

// routes
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);

// run server
let port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
