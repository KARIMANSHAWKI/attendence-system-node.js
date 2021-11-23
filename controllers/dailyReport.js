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

  if (!time.isBetween(beforeTime, afterTime)) {
    try {
      dailyReport = await new DailyReport({
        dateTime: new Date(),
        attendanceTime: nowDate,
        user: req.params.userId,
      });

      const report = await dailyReport.save();
      console.log(report);
       res.status(200).json(report);
    } catch (error) {}

  } else if (time.isAfter(afterTime)) {
    try {
      dailyReport = new DailyReport({
        dateTime: new Date(),
        lateTime: nowDate,
        user: req.params.userId,
      });
      const report = await dailyReport.save();
       res.status(200).json(report);
    } catch (error) {}

  } else {
    try {
      dailyReport = new DailyReport({
        dateTime: new Date(),
        absence: true,
        user: req.params.userId,
      });
      const report = await dailyReport.save();
       res.status(200).json(report);
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
      dailyReport =  new DailyReport({
        dateTime: new Date(),
        excuseTime: req.body.excuseTime,
        user: req.params.userId,
      });
      const report = await dailyReport.save();
      res.status(200).json(report);

    } catch (error) {}
  } else {
    res.status(402).json({ error: "time is too late" });
  }
};

module.exports = { takeAttendance, requestExcuse };
