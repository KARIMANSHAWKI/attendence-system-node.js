const router = require("express").Router();
const {
  getAllUsers,
  getUnVerified,
  updateUser,
  deleteUser,
} = require("../controllers/users");

const { verifyTokenAndAdmin } = require("../middlewares/verifyToken");


router.get("/", verifyTokenAndAdmin, getAllUsers);
router.get("/unverified", verifyTokenAndAdmin, getUnVerified);
router.put("/:id", verifyTokenAndAdmin, updateUser);
router.delete("/:id", verifyTokenAndAdmin, deleteUser);

module.exports = router;
