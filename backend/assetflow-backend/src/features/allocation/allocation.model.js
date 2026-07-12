const mongoose = require('mongoose');

const AllocationSchema = new mongoose.Schema(
  {
    asset: { type: mongoose.Schema.Types.ObjectId, ref: 'Asset', required: true },
    allocatedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
    expectedReturnDate: { type: Date, default: null },
    returnedAt: { type: Date, default: null },
    status: { type: String, default: 'Active', enum: ['Active', 'Returned'] }
  },
  { timestamps: true }
);

module.exports = { AllocationSchema };

