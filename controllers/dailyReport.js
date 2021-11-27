const moment = require("moment");
const { withoutDateAndFormatTime } = require("../services/handle-date");
const DailyReport = require("../models/DailyReport");

const takeAttendance = async (req, res, next) => {
  let nowDate = handleDate();
  var format = "hh:mm:ss";
  var time = moment(nowDate, format);
  beforeTime = moment("10:00:00", format);
  afterTime = moment("8:00:00", format);
  let dailyReport = " ";

  if (time.isBetween(beforeTime, afterTime)) {
    dailyReport = await new DailyReport({
      dateTime: new Date(),
      attendanceTime: nowDate,
      user: req.params.userId,
    });

    const report = await dailyReport.save();
    res.status(200).json(report);

  } else if (time.isAfter(afterTime)) {

    dailyReport = new DailyReport({
      dateTime: new Date(),
      lateTime: nowDate,
      user: req.params.userId,
    });

    const report = await dailyReport.save();
    res.status(200).json(report);

  } else {

    dailyReport = new DailyReport({
      dateTime: new Date(),
      absence: true,
      user: req.params.userId,
    });
    const report = await dailyReport.save();
    res.status(200).json(report);
    
  }
};

const requestExcuse = async (req, res, next) => {
  let nowDate = withoutDateAndFormatTime();
  var format = "hh:mm:ss";
  var time = moment(nowDate, format);
  beforeTime = moment("10:00:00", format);
  afterTime = moment("10:30:00", format);
  let dailyReport = "";
  if (!time.isBetween(beforeTime, afterTime)) {
    dailyReport = new DailyReport({
      dateTime: new Date(),
      excuseTime: req.body.excuseTime,
      user: req.params.userId,
    });
    const report = await dailyReport.save();
    res.status(200).json(report);
  } else {
    res.status(402).json({ error: "time is too late" });
  }
};

module.exports = { takeAttendance, requestExcuse };
