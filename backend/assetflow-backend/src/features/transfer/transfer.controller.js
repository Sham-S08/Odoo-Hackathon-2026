const { asyncHandler } = require('../../common/helpers/asyncHandler');
const { success } = require('../../common/utils/response');
const { transferService } = require('./transfer.service');

const transferController = {
  getTransfers: asyncHandler(async (req, res) => {
    const data = await transferService.listTransfers();
    return success(res, { data, message: 'Transfers fetched' });
  }),

  createTransfer: asyncHandler(async (req, res) => {
    const data = await transferService.createTransfer(req.body);
    return success(res, { statusCode: 201, data, message: 'Transfer created' });
  }),

  approveTransfer: asyncHandler(async (req, res) => {
    const data = await transferService.approveTransfer(req.params.id);
    return success(res, { data, message: 'Transfer approved' });
  }),

  rejectTransfer: asyncHandler(async (req, res) => {
    const data = await transferService.rejectTransfer(req.params.id);
    return success(res, { data, message: 'Transfer rejected' });
  })
};

module.exports = { transferController };

