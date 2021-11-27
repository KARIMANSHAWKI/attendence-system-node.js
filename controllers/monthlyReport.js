const MonthlyReport = require("../models/MonthlyReport");
const DailyReport = require("../models/DailyReport");
const { WithoutTime } = require("../services/handle-date");
let cron = require("node-cron");

const monthlyReport = async (req, res) => {
  const d = new Date();
  const day = d.getUTCDate();
  const currentMonth = new Date().getMonth();

  cron.schedule("* * * * *", async function () {
    // 1- get data from daily model for each user
    const attendanceTimes = await DailyReport.aggregate([
      {
        $match: { attendanceTime: { $ne: "" } },
      },
      {
        $group: {
          _id: {
            user: "$user",
            month: {
              $month: "$dateTime",
            },
          },
          attendanceTimeNum: { $sum: 1 },
        },
      },
      {
        $match: { "_id.month": currentMonth },
      },
    ]);

    const absenceTimes = await DailyReport.aggregate([
      {
        $match: { absence: { $eq: true } },
      },
      {
        $group: {
          _id: {
            user: "$user",
            month: {
              $month: "$dateTime",
            },
          },
          absenceTimesNum: { $sum: 1 },
        },
      },
      {
        $match: { "_id.month": currentMonth },
      },
    ]);

    const lateTimes = await DailyReport.aggregate([
      {
        $match: { lateTime: { $eq: null } },
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
      { $match: { excuseTime: { $eq: null } } },
      {
        $group: {
          _id: {
            user: "$user",
            month: {
              $month: "$dateTime",
            },
          },
          excuseTimesNum: { $sum: 1 },
        },
      },
      {
        $match: { "_id.month": currentMonth },
      },
    ]);

    // 2- format data to be ready for being inserted in monthly model
    let allData = [];
    for (i in attendanceTimes) {
      let monthlyReport = {
        dateNow: WithoutTime(new Date()),
        user: attendanceTimes[i]._id.user,
        month: attendanceTimes[i]._id.month,
        attendanceTimes: attendanceTimes[i].attendanceTimeNum,
      };
      allData.push(monthlyReport);
    }

    for (let i = 0; i < excuseTimes.length; i++) {
      for (let j in allData) {
        if (excuseTimes[i]._id.user.equals(allData[j].user)) {
          allData[j].excuseTimes = excuseTimes[i].excuseTimesNum;
        }
      }
    }

    for (let i = 0; i < absenceTimes.length; i++) {
      for (let j in allData) {
        if (absenceTimes[i]._id.user.equals(allData[j].user)) {
          allData[j].absenceTimes = absenceTimes[i].absenceTimesNum;
        }
      }
    }

    for (let i = 0; i < lateTimes.length; i++) {
      for (let j in allData) {
        if (lateTimes[i]._id.user.equals(allData[j].user)) {
          allData[j].lateTimes = lateTimes[i].lateTimeNum;
        }
      }
    }
    //  3- now data is ready to be inserted in monthly model
    MonthlyReport.insertMany(allData, function (err, data) {
      if (err != null) {
        consol.log(err);
      }
      console.log(
        `monthly report of ${currentMonth} month is inserted to database `
      );
    });
  });
};

module.exports = monthlyReport;
