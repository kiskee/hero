const express = require("express");
const CookieController = require("../controllers/cookie");

const api = express.Router();

api.post("/cookie/create", CookieController.createCookieApi);
api.patch("/cookie/:id", CookieController.updateCookieApi);
api.get('/cookie/getcookie/:id', CookieController.getCookie);
api.delete('/cookie/delete/:id', CookieController.deleteCookie);

module.exports = api;
