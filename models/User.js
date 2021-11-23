const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isSubadmin: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false },
    code: { type: Number },
    address: { type: String, required: true },
    age: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
