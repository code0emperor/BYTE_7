const express = require("express");
const route = express.Router();

const { makeGuide, updateGuide } = require("../controller/guide");
const { isSignedIn, unauthorizedAccess } = require("../middleware/auth");

route.post("/profile/create", isSignedIn, unauthorizedAccess, makeGuide);
route.put("/profile", isSignedIn, unauthorizedAccess, updateGuide);

module.exports = route;
