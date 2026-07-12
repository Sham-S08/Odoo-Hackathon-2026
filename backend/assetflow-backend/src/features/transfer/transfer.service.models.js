const mongoose = require('mongoose');
const { TransferSchema } = require('./transfer.model');

const TransferModel = mongoose.models.Transfer || mongoose.model('Transfer', TransferSchema);

module.exports = { TransferModel };

