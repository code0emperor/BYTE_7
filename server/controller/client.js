const User = require("../model/User");
const Guide = require("../model/Guide");
const dotenv = require("dotenv");
dotenv.config({
  path: "../config/config.env",
});

exports.allGuides = (req, res) => {
  try {
    User.find({ userCode: 8888 }, (err, user) => {
      if (err) {
        res.status(404).json({
          error: err,
        });
      }
      res.status(200).json({
        users: user,
      });
    });
  } catch (err) {
    return res.status(500).json({ message: err.message, success: false });
  }
};

exports.filter = (req, res) => {
  try {
    const filters = {
      location: req.body.location || "",
      availability: req.body.availability || "",
      specialization: req.body.specialization || "",
      language: req.body.language || "",
      gender: req.body.gender || "",
    };

    User.find(filters, (err, user) => {
      if (err) {
        res.status(404).json({
          error: err,
        });
      }
      res.status(200).json({
        users: user,
      });
    });
  } catch (err) {
    return res.status(500).json({ message: err.message, success: false });
  }
};
