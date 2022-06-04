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

  group: {
    type: String,
    required: true
  },

  supervisour: {
    type: String,
    required: true
  },

  msg: {
    type: String,
    required: true
  },

  rstatus: {
    type: String,
    default: "Pending"
  }


});

const Request = mongoose.model("request", RequestSchema)
module.exports = Request