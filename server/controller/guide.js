const User = require("../model/User");
const Guide = require("../model/Guide");
const dotenv = require("dotenv");
dotenv.config({
  path: "../config/config.env",
});

exports.makeGuide = (req, res) => {
  try {
    User.findById(req.body.id, (err, user) => {
      if (err) {
        console.log(err.message);
        return;
      }
      if (user.userCode !== "8888") {
        return res.status(401).json({
          message: "You are unauthorized to access this",
          success: false,
        });
      }
      return;
    });

    const fields = req.body;

    const guide = new Guide(fields);

    guide.save((err, guides) => {
      if (err) {
        let message = "Duplicate ";
        let flag = false;
        for (let i = 0; i < err.message.length; i++) {
          if (err.message[i] === "{" || err.message[i] === "}") flag = !flag;
          else if (flag && err.message[i] !== '"') {
            message += err.message[i];
          }
        }
        message += " registered";
        return res.status(400).json({
          message: message,
          success: false,
        });
      }
      res.status(200).json({
        guide: guides,
        success: true,
      });
    });
    console.log("Check");
  } catch (err) {
    return res.status(500).json({ message: err.message, success: false });
  }
};

exports.updateGuide = (req, res) => {
  try {
    const id = req.headers._id;
    Guide.findByIdAndUpdate(
      { _id: id },
      { $set: req.body },
      { new: true, useFindAndModify: false },
      (err, user) => {
        if (err) {
          return res.status(400).json({
            error: err.message,
          });
        }
        res.status(200).json({
          message: "User updated successfully",
          success: true,
          guide: user,
        });
      }
    );
  } catch (err) {
    return res.status(500).json({ message: err.message, success: false });
  }
};
