const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  patient: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  doctor: {
    type: Schema.Types.ObjectId,
    ref: 'doc',
  },
  messages: [
    {
      sender: {
        type: String,
        required: true,
      },
      message: {
        type: String,
        required: true,
      },
      timestamp: {
        type: Date,
        default: Date.now,
      },
    },
  ],
},);

const Messages = mongoose.model('Messages', messageSchema);


module.exports = Messages;
