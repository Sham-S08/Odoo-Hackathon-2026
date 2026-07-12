const { asyncHandler } = require('../../common/helpers/asyncHandler');
const { success } = require('../../common/utils/response');
const { notificationsService } = require('./notifications.service');

const notificationsController = {
  getNotifications: asyncHandler(async (req, res) => {
    const data = await notificationsService.listForUser(req.user.id);
    return success(res, { data, message: 'Notifications fetched' });
  }),

  markRead: asyncHandler(async (req, res) => {
    const data = await notificationsService.markRead(req.params.id, req.user.id);
    return success(res, { data, message: 'Notification marked as read' });
  })
};

module.exports = { notificationsController };

