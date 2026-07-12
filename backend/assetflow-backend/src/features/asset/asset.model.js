const mongoose = require('mongoose');
const { ASSET_LIFECYCLE_STATUS } = require('../../common/enums/assetLifecycle');

const AssetSchema = new mongoose.Schema(
  {
    assetTag: { type: String, index: true },
    serialNumber: { type: String, required: true, index: true, unique: true },

    category: { type: mongoose.Schema.Types.ObjectId, ref: 'AssetCategory', default: null },
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', default: null },

    condition: { type: String, default: '' },
    location: { type: String, default: '' },

    photo: {
      url: { type: String, default: '' },
      publicId: { type: String, default: '' }
    },

    documents: [{
      url: { type: String, default: '' },
      publicId: { type: String, default: '' },
      filename: { type: String, default: '' }
    }],

    bookable: { type: Boolean, default: true },
    lifecycleStatus: {
      type: String,
      enum: Object.values(ASSET_LIFECYCLE_STATUS),
      default: ASSET_LIFECYCLE_STATUS.AVAILABLE
    },

    status: { type: String, default: 'Active', enum: ['Active', 'Inactive'] }
  },
  { timestamps: true }
);

module.exports = { AssetSchema };

