const express = require("express");
const route = express.Router();

const {
  signin,
  signout,
  issignedin,
  signup,
  verifyEmail,
  sendMail,
} = require("../controller/auth");

const {
  changePassword,
  requestPasswordReset,
  resetPassword,
} = require("../controller/user");

// MIDDLEWARE

const { isSignedIn, unauthorizedAccess } = require("../middleware/auth");

// const { isAdmin } = require("../middleware/Check");

// AUTH routes
route.get("/", (req, res) => {
  res.status(200).send("HELLO");
});
route.post("/signup", signup);
route.post("/signin", signin);
route.post("/issignedin", issignedin);
route.get("/signout", isSignedIn, unauthorizedAccess, signout);

// route.get("/user/:id", isSignedIn, unauthorizedAccess, isAdmin, getUserById);
route.post("/changePassword", isSignedIn, unauthorizedAccess, changePassword);

route.post("/verify/:verificationRoute", verifyEmail);
// route.get("/getCurrentUser", isSignedIn, unauthorizedAccess, getCurrentUser);
// route.get("/getUserCount", getUserCount);
// route.get("/getUserCountStatusPending", getUserCountStatusPending);
// route.get("/getUserCountStatusVerified", getUserCountStatusVerified);
route.get("/sendMail", isSignedIn, unauthorizedAccess, sendMail);

route.post("/resetPasswordRequest", requestPasswordReset);
route.post("/resetPassword", resetPassword);

module.exports = route;
