const mongoose = require('mongoose');
const { AllocationSchema } = require('./allocation.model');

const AllocationModel = mongoose.models.Allocation || mongoose.model('Allocation', AllocationSchema);

module.exports = { AllocationModel };

