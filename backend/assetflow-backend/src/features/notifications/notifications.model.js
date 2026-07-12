const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
    title: { type: String, default: '' },
    message: { type: String, default: '' },
    type: { type: String, default: '' },
    read: { type: Boolean, default: false }
  },
  { timestamps: true }
);

module.exports = { NotificationSchema };

