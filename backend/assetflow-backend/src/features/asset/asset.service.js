const { AssetModel } = require('./asset.service.models');

async function listAssets(/* query */) {
  return AssetModel.find().lean();
}

async function getAssetById(id) {
  const asset = await AssetModel.findById(id).lean();
  if (!asset) {
    const err = new Error('Asset not found');
    err.statusCode = 404;
    throw err;
  }
  return asset;
}

async function createAsset(payload /*, user */) {
  // Placeholder business logic. QR code + upload + history will be implemented in later iteration.
  return AssetModel.create(payload);
}

async function updateAsset(id, payload /*, user */) {
  const updated = await AssetModel.findByIdAndUpdate(id, payload, { new: true });
  if (!updated) {
    const err = new Error('Asset not found');
    err.statusCode = 404;
    throw err;
  }
  return updated;
}

async function deleteAsset(id) {
  const result = await AssetModel.findByIdAndDelete(id);
  if (!result) {
    const err = new Error('Asset not found');
    err.statusCode = 404;
    throw err;
  }
}

async function getHistory(id) {
  // Placeholder history. Will be backed by AssetHistory model.
  return [];
}

module.exports = { assetService: { listAssets, getAssetById, createAsset, updateAsset, deleteAsset, getHistory } };

