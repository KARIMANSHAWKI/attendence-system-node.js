const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const DailyReportSchema = new mongoose.Schema(
  {
    date: { type: Date, required: true },
    attendanceTime: { type: Number, default: "none" },
    absence: { type: Boolean, default: false },
    excuseTime: { type: Date, default: "none" },
    lateTime: { type: Date, default: "none" },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

  },
  { timestamps: true }
);

module.exports = mongoose.model("DailyReport", DailyReportSchema);
