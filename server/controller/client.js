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

const userGenerate = async (guides) => {
  let users = [];
  guides.map(async (guide) => {
    // console.log(guide);
    console.log(guide[0].language);
    await User.findById(guide[0].id).then((user, err) => {
      console.log(err);
      console.log(user);
      if (err) {
        return res.status(400).json({ message: err.message, success: false });
      }
      // console.log(guide);
      users.push(user);
    });
  });
  return users;
};

exports.filter = async (req, res) => {
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

    await Guide.find(filters).then((guide, err) => {
      if (err) {
        console.log("Hello");
        return res.status(400).json({ message: err, success: false });
      }
      guides.push(guide);
      // console.log(guide);
      check = true;
    });

    console.log(guides);

    // const users = await userGenerate(guides);

    let users = [];
    guides.map(async (guide) => {
      // console.log(guide);
      // console.log(guide[0].language);
      await User.findById(guide[0].id).then((user, err) => {
        console.log(err);
        console.log(user);
        if (err) {
          return res.status(400).json({ message: err.message, success: false });
        }
        // console.log(guide);
        users.push(user);
      });
    });

    // while (users.length !== guides.length)
    // console.log(users.length + " " + guides.length);

    console.log(users + "Hello");
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
