const express = require("express");
const DayController = require("../controllers/day")


const api = express.Router();

api.post("/day/getday",DayController.getDay);
api.post("/day/create", DayController.createDay);
api.patch("/day/update", DayController.updateDay);
api.post("/day/dayuserlist", DayController.userListByDay);



module.exports = api;