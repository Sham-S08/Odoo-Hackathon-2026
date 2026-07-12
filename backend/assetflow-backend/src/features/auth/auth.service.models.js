const mongoose = require('mongoose');
const { EmployeeSchema } = require('./auth.model');

const EmployeeModel = mongoose.models.Employee || mongoose.model('Employee', EmployeeSchema);

module.exports = { EmployeeModel };

