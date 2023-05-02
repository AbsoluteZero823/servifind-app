const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({

  chatName: { type: String, trim: true },
  users:
    [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "user"
    }],
  latestMessage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Message",
  },
  inquiry_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Inquiry',
    required: false
  },
  offer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'offer',
    required: false
  },
  isArchived: {
    type: Boolean,
    default: false
  }

},
  { timestamps: true }
)

module.exports = mongoose.model('Chat', chatSchema);


