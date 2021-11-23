const router = require("express").Router();
const {takeAttendance, requestExcuse} = require("../controllers/dailyReport");

router.post("/attendance/:userId", takeAttendance);
router.post("/request/excuse/:userId", requestExcuse);

module.exports = router