const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("../utils/jwt");

function register(req, res) {
  const { firstname, lastname, email, password } = req.body;

  if (!email) res.status(400).send({ msg: "El email es obligatorio" });
  if (!password) res.status(400).send({ msg: "La contraseña es obligatoria" });

  const user = new User({
    firstname,
    lastname,
    email: email.toLowerCase(),
    role: "user",
    active: false,
  });

  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);
  user.password = hashPassword;

  user.save((error, userStorage) => {
    if (error) {
      res.status(400).send({ msg: "Error creating user" });
    } else {
      res.status(200).send(userStorage);
    }
  });
}

function login(req, res) {
    const { email, password } = req.body;
  
    if (!email) res.status(400).send({ msg: "Email is required" });
    if (!password) res.status(400).send({ msg: "Password is required" });
  
    const emailLowerCase = email.toLowerCase();
  
    User.findOne({ email: emailLowerCase }, (error, userStore) => {
      if (error) {
        res.status(500).send({ msg: "Server error" });
      } else {
        bcrypt.compare(password, userStore.password, (bcryptError, check) => {
          if (bcryptError) {
            res.status(500).send({ msg: "Server error" });
          } else if (!check) {
            res.status(400).send({ msg: "Incorrect password" });
          } else if (!userStore.active) {
            res.status(401).send({ msg: "Unauthorized or inactive user" });
          } else {
            res.status(200).send({
              access: jwt.createAccessToken(userStore),
              refresh: jwt.createRefreshToken(userStore),
            });
          }
        });
      }
    });
  }
  
  function refreshAccessToken(req, res) {
    const { token } = req.body;
  
    if (!token) res.status(400).send({ msg: "Token required" });
  
    const { user_id } = jwt.decoded(token);
  
    User.findOne({ _id: user_id }, (error, userStorage) => {
      if (error) {
        res.status(500).send({ msg: "Server error" });
      } else {
        res.status(200).send({
          accessToken: jwt.createAccessToken(userStorage),
        });
      }
    });
  }
  
  module.exports = {
    register,
    login,
    refreshAccessToken,
  };