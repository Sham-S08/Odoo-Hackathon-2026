const { AssetCategoryModel } = require('./assetCategory.service.models');

async function listCategories() {
  return AssetCategoryModel.find().lean();
}

async function createCategory(payload) {
  return AssetCategoryModel.create(payload);
}

async function updateCategory(id, payload) {
  const updated = await AssetCategoryModel.findByIdAndUpdate(id, payload, { new: true });
  if (!updated) {
    const err = new Error('Asset category not found');
    err.statusCode = 404;
    throw err;
  }
  return updated;
}

async function deleteCategory(id) {
  const result = await AssetCategoryModel.findByIdAndDelete(id);
  if (!result) {
    const err = new Error('Asset category not found');
    err.statusCode = 404;
    throw err;
  }
}

module.exports = { assetCategoryService: { listCategories, createCategory, updateCategory, deleteCategory } };

