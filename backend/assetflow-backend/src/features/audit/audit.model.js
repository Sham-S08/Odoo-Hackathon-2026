const mongoose = require('mongoose');

const AuditSchema = new mongoose.Schema(
  {
    asset: { type: mongoose.Schema.Types.ObjectId, ref: 'Asset', required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },

    auditor: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', default: null },
    verification: { type: Object, default: {} },

    status: {
      type: String,
      default: 'Create Audit',
      enum: [
        'Create Audit',
        'Assign Auditor',
        'Verification',
        'Discrepancy Report',
        'Close Audit'
      ]
    }
  },
  { timestamps: true }
);

module.exports = { AuditSchema };

