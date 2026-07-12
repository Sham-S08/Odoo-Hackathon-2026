const { NotificationModel } = require('./notifications.service.models');

async function listForUser(userId) {
  return NotificationModel.find({ user: userId }).sort({ createdAt: -1 }).lean();
}

async function markRead(id, userId) {
  const updated = await NotificationModel.findOneAndUpdate(
    { _id: id, user: userId },
    { read: true },
    { new: true }
  ).lean();

  if (!updated) {
    const err = new Error('Notification not found');
    err.statusCode = 404;
    throw err;
  }

  return updated;
}

module.exports = { notificationsService: { listForUser, markRead } };

