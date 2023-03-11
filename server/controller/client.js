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
    const location = req.body.location || [];
    const availability = req.body.availability || true;
    const specialization = req.body.specialization || [];
    const language = req.body.language || [];
    const gender = req.body.gender || "";
    let guides = [];
    let filters = {};

    if (location.length >= 1) filters.location = { $all: location };
    if (specialization.length >= 1)
      filters.specialization = { $all: specialization };
    if (language.length >= 1) filters.language = { $all: language };
    // filters.availability = availability;
    if (gender.length >= 1) filters.gender = gender;

    Guide.find(filters, (err, guide) => {
      if (err) {
        return res.status(400).json({ message: err.message, success: false });
      }
      guides.push(guide);
      check = true;
    });
    console.log(guides);
    let users = [];
    guides.map((guide) => {
      User.findById(guide.id, (err, user) => {
        if (err) {
          return res.status(400).json({ message: err.message, success: false });
        }
        users.push(user);
      });
    });
    for (var i = 0; i < guides.length; i++) {
      res.status(200).json({
        user: users[i],
        guide: guides[i],
        success: true,
      });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message, success: false });
  }
};
