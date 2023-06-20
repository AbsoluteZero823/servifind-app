const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
      },
      type_id:{
type:String,
required: true,
      },
      message: {
        type: String,
        required: true,
      },
      created_At: {
        type: Date,
        default: Date.now,
      },
      isRead: {
        type: Boolean,
        default: false,
      },
      user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
})

module.exports = mongoose.model('Notification', notificationSchema);