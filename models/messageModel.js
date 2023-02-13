const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  patientMessage: {
    type: Schema.Types.ObjectId,
    ref: 'docs',
    // required: true
  },
  doctorMessage: {
    type: Schema.Types.ObjectId,
    ref: 'userss',
    // required: true
  },
  text: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Messages = mongoose.model('Messages', messageSchema);

module.exports = Messages;
