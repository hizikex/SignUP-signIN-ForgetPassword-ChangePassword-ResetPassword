const user=require("../models/userModel")
const doc=require("../models/userModel")
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const appointmentSchema= new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  doctor: {
    type: Schema.Types.ObjectId,
    ref: 'doc',
  },
  appointment: [
    {
      appointmentDate: {
        type: String,
        required: true,
      },
      appointmentTime: {
        type: String,
        required: true,
      },
      appointmentType: {
        type: String
    },
    appointmentStatus: {
        type: Boolean,
        default:false
    },
      timestamp: {
        type: Date,
        default: Date.now,
      },
    },
  ],
})

const appointment  = mongoose.model('appointment', appointmentSchema);


module.exports = appointment;