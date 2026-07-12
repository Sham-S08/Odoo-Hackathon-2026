const mongoose = require('mongoose');
const { DepartmentSchema } = require('./department.model');

const DepartmentModel = mongoose.models.Department || mongoose.model('Department', DepartmentSchema);

module.exports = { DepartmentModel };

