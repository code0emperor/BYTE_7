const express = require("express");
const route = express.Router();

const { allGuides, filter } = require("../controller/client");
const { isSignedIn, unauthorizedAccess } = require("../middleware/auth");

route.get("/home", isSignedIn, unauthorizedAccess, allGuides);
route.get("/home/search", isSignedIn, unauthorizedAccess, filter);

module.exports = route;
