const { asyncHandler } = require('../../common/helpers/asyncHandler');
const { success } = require('../../common/utils/response');
const { activityLogsService } = require('./activityLogs.service');

const activityLogsController = {
  getLogs: asyncHandler(async (req, res) => {
    const data = await activityLogsService.list(req.user.id, req.query);
    return success(res, { data, message: 'Activity logs fetched' });
  })
};

module.exports = { activityLogsController };

