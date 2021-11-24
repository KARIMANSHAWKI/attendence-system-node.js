const moment = require("moment");
const MonthlyReport = require("../models/MonthlyReport");
const DailyReport = require("../models/DailyReport");

const monthlyReport = async (req, res) => {
  const d = new Date();
  const day = d.getUTCDate();
  const currentMonth = new Date().getMonth() + 1;

  if (day !== 1) {
      const attendanceTimes = await DailyReport.aggregate([
        {
          $match: { "attendanceTime": { $ne: '' } },
        },
      {
        $group: {
          _id: {
            user: "$user",
            month:{
              $month: "$dateTime"
            }
          },
          attendanceTimeNum: {$sum: 1}
        },
      },
      {
        $match: {"_id.month": currentMonth }
      }

    ]);

    const absenceTimes = await DailyReport.aggregate([
      {
        $match: { "absence": { $eq: true } },
      },
      {
        $group: {
          _id: {
            user: "$user",
            month:{
              $month: "$dateTime"
            }
          },
          absenceTimesNum: {$sum: 1}
        },
      },
      {
        $match: {"_id.month": currentMonth}
      }

    ]);

    const lateTimes = await DailyReport.aggregate([
      {
        $match: { "lateTime": { $eq: null } },
      },
      {
        $group: {
          _id: {
            user: "$user",
            month: {
              $month: "$dateTime",
            },
          },
          lateTimeNum: { $sum: 1 },
        },
      },
      {
        $match: { "_id.month": currentMonth },
      },
    ]);

    const excuseTimes = await DailyReport.aggregate([
      {$match: {"excuseTime": {$eq: null}}},
      {
        $group: {
          _id: {
            user: "$user",
            month:{
              $month: "$dateTime"
            }
          },
          excuseTimesNum: {$sum: 1}
        },
      },
      {
      $match: {"_id.month": currentMonth}
      }
    ]);


    res.json({attendanceTimes, absenceTimes, lateTimes})
  } else {
  }
};

module.exports = { monthlyReport };
