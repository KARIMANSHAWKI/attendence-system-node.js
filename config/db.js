const mongoose = require("mongoose");
const winston = require("winston");

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  winston.info(`MongoDB Connected: ${conn.connection.host}`);
};

module.exports = connectDB;
