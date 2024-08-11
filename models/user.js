const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  studentname: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  courses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
  }]
});

const User = mongoose.model("User", userSchema);

module.exports = User;