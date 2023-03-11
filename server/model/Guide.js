var mongoose = require("mongoose");

var guideSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: [true, "Please tell us your name!"],
      minlength: 3,
      maxlength: 32,
      trim: true,
    },
    location: {
      type: [String],
      required: true,
    },
    availability: {
      type: Boolean,
      default: true,
    },
    gender: {
      type: String,
      required: true,
    },
    specialization: {
      type: [String],
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Guide", guideSchema);
