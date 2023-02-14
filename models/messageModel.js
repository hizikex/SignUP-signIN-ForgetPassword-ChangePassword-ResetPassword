const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  senderP: {
    type: Schema.Types.ObjectId,
    ref: 'Patient',
  },
  senderD: {
    type: Schema.Types.ObjectId,
    ref: 'Doctor',
  },
  recieverP: {
    type: Schema.Types.ObjectId,
    ref: 'Patient',
  },
  recieverD: {
    type: Schema.Types.ObjectId,
    ref: 'Doctor',
  },
  message: { type: String,
        required: true,
      },
},{timestamp: true});

const Messages = mongoose.model('Messages', messageSchema);

module.exports = Messages;
