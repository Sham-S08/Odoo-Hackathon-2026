const { asyncHandler } = require('../../common/helpers/asyncHandler');
const { success } = require('../../common/utils/response');
const { dashboardService } = require('./dashboard.service');

const dashboardController = {
  getDashboard: asyncHandler(async (req, res) => {
    const data = await dashboardService.getDashboard(req.user.id);
    return success(res, { data, message: 'Dashboard data fetched' });
  })
};

module.exports = { dashboardController };

