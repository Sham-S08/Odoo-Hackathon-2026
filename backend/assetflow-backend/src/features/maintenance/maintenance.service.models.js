const mongoose = require('mongoose');
const { MaintenanceSchema } = require('./maintenance.model');

const MaintenanceModel = mongoose.models.Maintenance || mongoose.model('Maintenance', MaintenanceSchema);

module.exports = { MaintenanceModel };

