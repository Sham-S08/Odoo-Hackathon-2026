const { asyncHandler } = require('../../common/helpers/asyncHandler');
const { success } = require('../../common/utils/response');
const { allocationService } = require('./allocation.service');

const allocationController = {
  getAllocations: asyncHandler(async (req, res) => {
    const data = await allocationService.listAllocations(req.query);
    return success(res, { data, message: 'Allocations fetched' });
  }),

  createAllocation: asyncHandler(async (req, res) => {
    const data = await allocationService.createAllocation(req.body);
    return success(res, { statusCode: 201, data, message: 'Allocation created' });
  }),

  returnAllocation: asyncHandler(async (req, res) => {
    const data = await allocationService.returnAllocation(req.params.id);
    return success(res, { data, message: 'Asset returned' });
  })
};

module.exports = { allocationController };

