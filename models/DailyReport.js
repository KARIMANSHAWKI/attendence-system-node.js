const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const DailyReportSchema = new mongoose.Schema(
  {
    dateTime: { type: Date, required: true },
    attendanceTime: { type: String, default: ''},
    absence: { type: Boolean, default: false },
    excuseTime: { type: Date, default: 0 },
    lateTime: { type: Date, default: null },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

  },
  { timestamps: true }
);

module.exports = mongoose.model("DailyReport", DailyReportSchema);
