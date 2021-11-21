const decryptPassword = require("../services/decrypt-password");
const User = require("../models/User");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({isAdmin: false, isSubadmin: false});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const getUnVerified = async (req, res) => {
  try {
    const unVerifiedUsers = await User.find({ isVerified: false });
    res.status(200).json(unVerifiedUsers);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const updateUser = async (req, res) => {
  if (req.body.password) {
    req.body.password = decryptPassword(req.body.password);
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
};


module.exports = { getAllUsers, getUnVerified, updateUser, deleteUser };
