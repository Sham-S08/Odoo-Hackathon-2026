const { asyncHandler } = require('../../common/helpers/asyncHandler');
const { success } = require('../../common/utils/response');
const { aiService } = require('./ai.service');

const aiController = {
  maintenanceInsights: asyncHandler(async (req, res) => {
    const data = await aiService.getMaintenanceInsights(req.body);
    return success(res, { data, message: 'AI maintenance insights generated' });
  })
};

module.exports = { aiController };

