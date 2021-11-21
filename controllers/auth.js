const User = require("../models/User");
const cryptPassword = require("../services/crypt-password");
const decryptPassword = require("../services/decrypt-password");
const getAccessToken = require("../services/access-token");
const calcAge = require("../services/calc-age");

// REGISTER
const register = async (req, res) => {
  try {
    const newUser = await new User({
      username: req.body.username,
      email: req.body.email,
      password: cryptPassword(req.body.password),
      address: req.body.address,
      age: calcAge(req.body.birthDate)
    });

    const user = await newUser.save();
    const { password, ...info } = user._doc;
    res.status(201).json(info);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// LOGIN
const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(401).json("wrong credentials!");

    decryptPassword(user.password) !== req.body.password &&
      res.status(401).json("wrong credentials!");

    const { password, ...info } = user._doc;
    const accessToken = getAccessToken(
      user._id,
      user.isAdmin,
      "3d",
      user.isSubadmin,
      user.isVerified,
      process.env.JWT_SECRET
    );
    console.log(accessToken);
    res.status(200).json({...info, accessToken});
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = { register, login };
