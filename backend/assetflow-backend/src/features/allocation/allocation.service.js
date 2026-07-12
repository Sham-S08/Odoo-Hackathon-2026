const { AllocationModel } = require('./allocation.service.models');

async function listAllocations() {
  return AllocationModel.find().lean();
}

async function createAllocation(payload) {
  return AllocationModel.create(payload);
}

async function returnAllocation(id) {
  // Placeholder. Real implementation updates asset status and allocation history.
  const updated = await AllocationModel.findByIdAndUpdate(id, { returnedAt: new Date() }, { new: true }).lean();
  if (!updated) {
    const err = new Error('Allocation not found');
    err.statusCode = 404;
    throw err;
  }
  return updated;
}

module.exports = { allocationService: { listAllocations, createAllocation, returnAllocation } };

