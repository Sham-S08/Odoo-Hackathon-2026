const { TransferModel } = require('./transfer.service.models');

async function listTransfers() {
  return TransferModel.find().lean();
}

async function createTransfer(payload) {
  return TransferModel.create(payload);
}

async function approveTransfer(id) {
  const updated = await TransferModel.findByIdAndUpdate(id, { status: 'Approved' }, { new: true }).lean();
  if (!updated) {
    const err = new Error('Transfer not found');
    err.statusCode = 404;
    throw err;
  }
  return updated;
}

async function rejectTransfer(id) {
  const updated = await TransferModel.findByIdAndUpdate(id, { status: 'Rejected' }, { new: true }).lean();
  if (!updated) {
    const err = new Error('Transfer not found');
    err.statusCode = 404;
    throw err;
  }
  return updated;
}

module.exports = { transferService: { listTransfers, createTransfer, approveTransfer, rejectTransfer } };

