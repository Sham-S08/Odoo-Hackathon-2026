const mongoose = require('mongoose');

const TransferSchema = new mongoose.Schema(
  {
    asset: { type: mongoose.Schema.Types.ObjectId, ref: 'Asset', required: true },
    requestedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
    fromDepartment: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', default: null },
    toDepartment: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', default: null },
    notes: { type: String, default: '' },

    status: { type: String, default: 'Requested', enum: ['Requested', 'Approved', 'Rejected', 'Reallocated'] }
  },
  { timestamps: true }
);

module.exports = { TransferSchema };

