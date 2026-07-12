const mongoose = require('mongoose');
const { AuditSchema } = require('./audit.model');

const AuditModel = mongoose.models.Audit || mongoose.model('Audit', AuditSchema);

module.exports = { AuditModel };

