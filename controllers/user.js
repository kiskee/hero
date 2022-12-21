const bcrypt = require("bcryptjs");
const User = require("../models/user");
const image = require("../utils/image");

async function getMe(req, res) {
  const { user_id } = req.user;

  const response = await User.findById(user_id);

  if (!response) {
    res.status(400).send({ msg: "No se ha encontrado usuario" });
  } else {
    res.status(200).send(response);
  }
}

async function getUsers(req, res) {
  const { active } = req.query;
  let response = null;

  if (active === undefined) {
    response = await User.find();
  } else {
    response = await User.find({ active });
  }

  res.status(200).send(response);
}

async function createUser(req, res) {
  const { password } = req.body;
  const user = new User({ ...req.body, active: false });

  const salt = bcrypt.genSaltSync(10);
  const hasPassword = bcrypt.hashSync(password, salt);
  user.password = hasPassword;

  user.save((error, userStored) => {
    if (error) {
      res.status(400).send({ msg: "Error creating user" });
    } else {
      res.status(201).send(userStored);
    }
  });
}

async function updateUser(req, res) {
  const { id } = req.params;
  const userData = req.body;

  if (userData.password) {
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(userData.password, salt);
    userData.password = hashPassword;
  } else {
    delete userData.password;
  }

  if (req.files.avatar) {
    const imagePath = image.getFilePath(req.files.avatar);
    userData.avatar = imagePath;
  }

  User.findByIdAndUpdate({ _id: id }, userData, (error) => {
    if (error) {
      res.status(400).send({ msg: "Failed to update user" });
    } else {
      res.status(200).send({ msg: "successful update" });
    }
  });
}

async function deleteUser(req, res) {
  const { id } = req.params;

  User.findByIdAndDelete(id, (error) => {
    if (error) {
      res.status(400).send({ msg: "Error deleting user" });
    } else {
      res.status(200).send({ msg: "User Deleted" });
    }
  });
}

async function getRegisterDayByuser(req, res) {
  const { email, date, type, shedule, floor } = req.body;
  if (!email) res.status(400).send({ msg: "El email es obligatorio" });
  //if (!date) res.status(400).send({ msg: "El date es obligatorio" });

  const response = await User.find({ email: email });

  if (response.length < 1) {
    res.status(400).send('no data for this email');
  } else {
    /*
    let resultado;
    if (date)
      resultado = response[0].registerDays.filter((x) => x.date == date);

    if (resultado.length > 0) {
      if (shedule) resultado = resultado.filter((x) => x.shedule == shedule);

      if (floor) resultado = resultado.filter((x) => x.floor == floor);

      if (type) resultado = resultado.filter((x) => x.type == type);
    }

    res.status(200).send(resultado);
  }
  */
  res.status(200).send(response[0].registerDays);
  }
}

async function updateDaysForUsers(req, res) {
  const { email } = req.body;
  const data = req.body;

  User.findOneAndUpdate({ email: email }, data, (error) => {
    if (error) {
      res.status(400).send({ msg: "Failed to update Day" });
    } else {
      res.status(200).send({ msg: "successful update" });
    }
  });
} 

module.exports = {
  getMe,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getRegisterDayByuser,
  updateDaysForUsers,
};
