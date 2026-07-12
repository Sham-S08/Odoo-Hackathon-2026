const mongoose = require('mongoose');
const { AssetSchema } = require('./asset.model');

const AssetModel = mongoose.models.Asset || mongoose.model('Asset', AssetSchema);

module.exports = { AssetModel };

