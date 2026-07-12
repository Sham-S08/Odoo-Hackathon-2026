const mongoose = require('mongoose');
const { AssetCategorySchema } = require('./assetCategory.model');

const AssetCategoryModel = mongoose.models.AssetCategory || mongoose.model('AssetCategory', AssetCategorySchema);

module.exports = { AssetCategoryModel };

