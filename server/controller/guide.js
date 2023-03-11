const User = require("../model/User");
const Guide = require("../model/Guide");
const dotenv = require("dotenv");
dotenv.config({
  path: "../config/config.env",
});

exports.makeGuide = (req, res) => {
  try {
    const fields = req.body;

    const guide = new Guide(fields);

    guide.save();
  } catch (err) {
    return res.status(500).json({ message: err.message, success: false });
  }
};

exports.updateGuide = (req, res) => {
  try {
    Guide.findByIdAndUpdate(
      { _id: req.auth._id },
      { $set: req.body },
      { new: true, useFindAndModify: false },
      (err, user) => {
        if (err) {
          return res.status(400).json({
            error: "You are not authorized to update this user",
          });
        }
        res.json({ message: "User updated successfully" });
      }
    );
  } catch (err) {
    return res.status(500).json({ message: err.message, success: false });
  }
};
