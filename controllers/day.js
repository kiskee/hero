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

  if (!date) res.status(400).send({ msg: "El date es obligatorio" });

  const response = await Day.findOne({ date: date });

  let result = response.userList;

  if (type) {
    result = result.filter((x) => x.type == type);
  }
  if (shedule) {
    result = result.filter((x) => x.shedule.search(shedule) > -1);
  }
  if (floor) {
    result = result.filter((x) => x.floor.search(floor) > -1);
  }

  res.status(200).send(result);
}

module.exports = {
  createDay,
  getDay,
  updateDay,
  userListByDay,
};
