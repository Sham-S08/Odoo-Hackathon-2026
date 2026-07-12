const mongoose = require('mongoose');

const MaintenanceSchema = new mongoose.Schema(
  {
    asset: { type: mongoose.Schema.Types.ObjectId, ref: 'Asset', required: true },
    requestedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
    description: { type: String, default: '' },

    technician: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', default: null },
    status: { type: String, default: 'Pending', enum: ['Pending', 'Approved', 'Assigned', 'In Progress', 'Resolved', 'Rejected'] }
  },
  { timestamps: true }
);

module.exports = { MaintenanceSchema };

