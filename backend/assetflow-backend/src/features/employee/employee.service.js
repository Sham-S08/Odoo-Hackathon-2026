const bcrypt = require('bcrypt');
const { EmployeeModel } = require('./employee.service.models');
const { ROLES } = require('../../common/enums/roles');

async function listEmployees() {
  return EmployeeModel.find().select('-password').lean();
}

async function getEmployeeById(id) {
  const emp = await EmployeeModel.findById(id).select('-password').lean();
  if (!emp) {
    const err = new Error('Employee not found');
    err.statusCode = 404;
    throw err;
  }
  return emp;
}

async function promoteEmployee(id, payload) {
  // Expected payload: { role: "Department Head" | ... }
  const { role } = payload || {};
  if (!role) {
    const err = new Error('Missing role');
    err.statusCode = 400;
    throw err;
  }

  const allowed = [ROLES.DEPARTMENT_HEAD, ROLES.ASSET_MANAGER, ROLES.EMPLOYEE, ROLES.ADMIN];
  if (!allowed.includes(role)) {
    const err = new Error('Invalid role');
    err.statusCode = 400;
    throw err;
  }

  const updated = await EmployeeModel.findByIdAndUpdate(id, { role }, { new: true })
    .select('-password')
    .lean();

  if (!updated) {
    const err = new Error('Employee not found');
    err.statusCode = 404;
    throw err;
  }

  return updated;
}

async function changeStatus(id, payload) {
  const { status } = payload || {};
  if (!status || !['Active', 'Inactive'].includes(status)) {
    const err = new Error('Invalid status');
    err.statusCode = 400;
    throw err;
  }

  const updated = await EmployeeModel.findByIdAndUpdate(id, { status }, { new: true })
    .select('-password')
    .lean();

  if (!updated) {
    const err = new Error('Employee not found');
    err.statusCode = 404;
    throw err;
  }

  return updated;
}

module.exports = {
  employeeService: { listEmployees, getEmployeeById, promoteEmployee, changeStatus }
};


