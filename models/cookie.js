const mongoose = require("mongoose");

const CookieSchema = mongoose.Schema({
  date: String,
  cookie: String,
});

module.exports = mongoose.model("cookie", CookieSchema);
