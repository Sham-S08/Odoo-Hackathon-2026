const mongoose = require('mongoose');

const ActivityLogSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
    action: { type: String, default: '' },
    module: { type: String, default: '' },
    referenceId: { type: mongoose.Schema.Types.ObjectId, default: null },
  },
  { timestamps: true }
);

module.exports = { ActivityLogSchema };

