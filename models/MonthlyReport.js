const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MonthlyReportSchema = new mongoose.Schema(
  {
    dateNow: { type: String, required: true },
    attendanceTimes: { type: Number, default: 0 },
    absenceTimes: { type: Number, default: 0 },
    excuseTimes: { type: Number, default: 0 },
    lateTimes: { type: Number, default: 0 },
    month: { type: String, default: '' },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

  },
  { timestamps: true }
);

module.exports = mongoose.model("MonthlyReport", MonthlyReportSchema);
