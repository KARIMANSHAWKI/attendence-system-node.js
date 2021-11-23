const moment = require("moment");
const MonthlyReport = require("../models/MonthlyReport");
const DailyReport = require("../models/DailyReport");

const monthlyReport = async (req, res) => {
  const d = new Date();
  const day = d.getUTCDate();
  const thisMonth = new Date().getMonth()+1;
  if (day !== 1) {
    const attendanceTimes = await DailyReport.aggregate([
      {
        $project: {
          _id: 0,
          attendanceTimes: {  $dateToString: { format: "%m", date: "$dateTime" }  },
        },
      },
    //   { $match: { attendanceTime: { $ne: '' } } },
      {
        $group: {
          _id: null,
          attendanceTimesNum: { $sum: 1 },
        },
      },
    ]);

    res.send(attendanceTimes);
  } else {
  }
};

module.exports = { monthlyReport };
