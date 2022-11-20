const mongoose = require("mongoose");

const DaySchema = mongoose.Schema({
  date: String,
  userList: Array,
});

module.exports = mongoose.model("day", DaySchema);
