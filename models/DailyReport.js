const mongoose = require("mongoose");

const DailyReportSchema = new mongoose.Schema(
  {
    date: { type: Date, required: true },
    attendanceTimes: { type: Number, default: 0 },
    absence: { type: Boolean, default: false },
    excuseTime: { type: Date },
    lateTime: { type: Number },
  },
  { timestamps: true }
);

module.exports = mongoose.model("DailyReport", DailyReportSchema);
