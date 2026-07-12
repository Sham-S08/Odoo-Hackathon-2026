const mongoose = require('mongoose');
const { NotificationSchema } = require('./notifications.model');

const NotificationModel = mongoose.models.Notification || mongoose.model('Notification', NotificationSchema);

module.exports = { NotificationModel };

