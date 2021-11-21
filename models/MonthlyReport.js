const mongoose = require("mongoose");

const MonthlyReportSchema = new mongoose.Schema(
  {
    date: { type: Date, required: true },
    attendanceTimes: { type: Number, default: 0 },
    absenceTimes: { type: Number, default: 0 },
    excuseTimes: { type: Number, default: 0 },
    lateTimes: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("MonthlyReport", MonthlyReportSchema);
