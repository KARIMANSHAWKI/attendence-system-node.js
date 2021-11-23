const moment = require("moment");
const handleDate = require("../services/handle-date");
const DailyReport = require("../models/DailyReport");

const takeAttendance = async (req, res) => {
  let nowDate = handleDate();
  var format = "hh:mm:ss";
  var time = moment(nowDate, format);
  beforeTime = moment("10:00:00", format);
  afterTime = moment("8:00:00", format);
  let dailyReport = " ";

  if (time.isBetween(beforeTime, afterTime)) {
    try {
      dailyReport = await new DailyReport({
        date: new Date(),
        attendanceTime: nowDate,
        user: req.params.userId,
      });
      return res.status(200).json(dailyReport);
    } catch (error) {}

  } else if (time.isAfter(afterTime)) {
    try {
      dailyReport = await new DailyReport({
        date: new Date(),
        lateTime: nowDate,
        user: req.params.userId,
      });
      return res.status(200).json(dailyReport);
    } catch (error) {}

  } else {
    try {
      dailyReport = await new DailyReport({
        date: new Date(),
        absence: true,
        user: req.params.userId,
      });
      return res.status(200).json(dailyReport);
    } catch (error) {}
  }
};

const requestExcuse = async (req, res) => {
  let nowDate = handleDate();
  var format = "hh:mm:ss";
  var time = moment(nowDate, format);
  beforeTime = moment("10:00:00", format);
  afterTime = moment("10:30:00", format);
  let dailyReport = "";
  if (time.isBetween(beforeTime, afterTime)) {
    try {
      dailyReport = await new DailyReport({
        date: new Date(),
        excuseTime: req.body.excuseTime,
        user: req.params.userId,
      });

    } catch (error) {}
  } else {
    res.status(402).json({ error: "time is too late" });
  }
};

module.exports = { takeAttendance, requestExcuse };
