const Day = require("../models/day");
const mongoose = require("mongoose");

/**
 *
 * @param {*} req
 * @param {*} res
 */
async function getDay(req, res) {
  const { date } = req.body;

  const response = await Day.findOne({ date: date });

  if (!response) {
    res.status(400).send({ msg: "Day not found" });
  } else {
    res.status(200).send(response);
  }
}

/**
 *
 * @param {*} req
 * @param {*} res
 */
async function createDay(req, res) {
  const { date, userList } = req.body;

  const day = new Day({
    date,
    userList,
  });

  day.save((error, dayStored) => {
    if (error) {
      res.status(400).send({ msg: "Error creating Day" });
    } else {
      res.status(201).send(dayStored);
    }
  });
}

async function updateDay(req, res) {
  const { date } = req.body;
  const data = req.body;

  Day.findOneAndUpdate({ date: date }, data, (error) => {
    if (error) {
      res.status(400).send({ msg: "Failed to update Day" });
    } else {
      res.status(200).send({ msg: "successful update" });
    }
  });
}

async function userListByDay(req, res) {
  const { date, type, shedule, floor } = req.body;
  const response = await Day.find({ date: date, "userList.type": type });

  if (response.length < 1) {
    res.status(400).send({ msg: "No users for this day" });
  } else {
    res.status(200).send(
      response[0].userList
        .filter((x) => x.type == type)
        .filter((x) => x.shedule.search(shedule) > -1)
        .filter((x) => x.floor.search(floor) > -1)
    );
  }
}

module.exports = {
  createDay,
  getDay,
  updateDay,
  userListByDay,
};
