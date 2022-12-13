const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
    email: {
        type: String,
        unique: true,
    },
    password: String,
    role: String,
    active: Boolean,
    registerDays: Array,
})

module.exports = mongoose.model("user", UserSchema)