const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RequestSchema = new Schema({
  studentID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'student',
    required: true
  },

  staffID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'staff',
    required: true
  },

  subject: {
    type: String,
    required: true
  },

  msg: {
    type: String,
    required: true
  }


});

const Request = mongoose.model("request", RequestSchema)
module.exports = Request