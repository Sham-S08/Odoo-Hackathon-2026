const mongoose = require('mongoose');

const DepartmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    parentDepartment: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', default: null },
    departmentHead: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', default: null },
    status: { type: String, default: 'Active', enum: ['Active', 'Inactive'] }
  },
  { timestamps: true }
);

module.exports = { DepartmentSchema };

