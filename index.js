const express = require("express");
const helmet = require("helmet");
var morgan = require('morgan')
const dotenv = require("dotenv");
const connectDB = require("./config/db");



// init app
const app = express();

// load config
dotenv.config({ path: "./config/config.env" });

// middleware
app.use(helmet());
app.use(morgan('dev'));

// connect to db
connectDB()

// run server 
let port = process.env.PORT || 5000
app.listen(port, ()=> {
    console.log(`Server is running on ${port}`)
});