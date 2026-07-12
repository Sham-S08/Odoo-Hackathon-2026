const mongoose = require('mongoose');
const { EmployeeSchema } = require('./employee.model');

const EmployeeModel = mongoose.models.Employee || mongoose.model('Employee', EmployeeSchema);

module.exports = { EmployeeModel };

