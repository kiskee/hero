const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { API_VERSION } = require("./constants");

const app = express();

// Import Rounting
const authRoutes = require("./router/auth");
const userRoutes = require("./router/user");
const cookieRoutes = require("./router/cookie");
const dayRoutes = require("./router/day");

// Configure Body Parse
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configure static files
app.use(express.static("uploads"));

// Configure Header HTTP - CORS
app.use(cors());

// Configure Routings
app.use(`/api/${API_VERSION}`, authRoutes);
app.use(`/api/${API_VERSION}`, userRoutes);
app.use(`/api/${API_VERSION}`, cookieRoutes);
app.use(`/api/${API_VERSION}`, dayRoutes);

module.exports = app;
