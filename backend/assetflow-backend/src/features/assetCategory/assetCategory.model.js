const mongoose = require('mongoose');

const AssetCategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    status: { type: String, default: 'Active', enum: ['Active', 'Inactive'] }
  },
  { timestamps: true }
);

module.exports = { AssetCategorySchema };

