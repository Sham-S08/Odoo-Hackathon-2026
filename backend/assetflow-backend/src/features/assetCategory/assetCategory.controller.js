const { asyncHandler } = require('../../common/helpers/asyncHandler');
const { success } = require('../../common/utils/response');
const { assetCategoryService } = require('./assetCategory.service');

const assetCategoryController = {
  getCategories: asyncHandler(async (req, res) => {
    const data = await assetCategoryService.listCategories();
    return success(res, { data, message: 'Asset categories fetched' });
  }),

  createCategory: asyncHandler(async (req, res) => {
    const data = await assetCategoryService.createCategory(req.body);
    return success(res, { statusCode: 201, data, message: 'Asset category created' });
  }),

  updateCategory: asyncHandler(async (req, res) => {
    const data = await assetCategoryService.updateCategory(req.params.id, req.body);
    return success(res, { data, message: 'Asset category updated' });
  }),

  deleteCategory: asyncHandler(async (req, res) => {
    await assetCategoryService.deleteCategory(req.params.id);
    return success(res, { message: 'Asset category deleted' });
  })
};

module.exports = { assetCategoryController };

