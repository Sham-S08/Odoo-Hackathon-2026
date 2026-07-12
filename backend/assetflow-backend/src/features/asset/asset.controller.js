const { asyncHandler } = require('../../common/helpers/asyncHandler');
const { success } = require('../../common/utils/response');
const { assetService } = require('./asset.service');

const assetController = {
  getAssets: asyncHandler(async (req, res) => {
    const data = await assetService.listAssets(req.query);
    return success(res, { data, message: 'Assets fetched' });
  }),

  getAssetById: asyncHandler(async (req, res) => {
    const data = await assetService.getAssetById(req.params.id);
    return success(res, { data, message: 'Asset fetched' });
  }),

  createAsset: asyncHandler(async (req, res) => {
    const data = await assetService.createAsset(req.body, req.user);
    return success(res, { statusCode: 201, data, message: 'Asset created' });
  }),

  updateAsset: asyncHandler(async (req, res) => {
    const data = await assetService.updateAsset(req.params.id, req.body, req.user);
    return success(res, { data, message: 'Asset updated' });
  }),

  deleteAsset: asyncHandler(async (req, res) => {
    await assetService.deleteAsset(req.params.id);
    return success(res, { message: 'Asset deleted' });
  }),

  getAssetHistory: asyncHandler(async (req, res) => {
    const data = await assetService.getHistory(req.params.id);
    return success(res, { data, message: 'Asset history fetched' });
  })
};

module.exports = { assetController };

