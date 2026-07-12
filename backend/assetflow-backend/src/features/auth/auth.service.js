const bcrypt = require('bcrypt');
const { EmployeeModel } = require('./auth.service.models');
const { signAccessToken } = require('../../config/jwt');

async function signup({ firstName, lastName, email, password, department, employeeId, status }) {
  const existing = await EmployeeModel.findOne({ email });
  if (existing) {
    const err = new Error('Email already in use');
    err.statusCode = 409;
    throw err;
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const employee = await EmployeeModel.create({
    employeeId,
    firstName,
    lastName,
    email,
    passwordHash,
    department: department || null,
    role: 'Employee',
    status: status || 'Active'
  });

  return {
    id: employee._id,
    firstName: employee.firstName,
    lastName: employee.lastName,
    email: employee.email,
    role: employee.role,
    department: employee.department,
    status: employee.status
  };
}

async function login({ email, password }) {
  const employee = await EmployeeModel.findOne({ email }).select('+passwordHash');
  if (!employee) {
    const err = new Error('Invalid email or password');
    err.statusCode = 401;
    throw err;
  }

  const ok = await bcrypt.compare(password, employee.passwordHash);
  if (!ok) {
    const err = new Error('Invalid email or password');
    err.statusCode = 401;
    throw err;
  }

  employee.lastLoginAt = new Date();
  await employee.save();

  const token = signAccessToken({
    employeeId: employee._id.toString(),
    role: employee.role
  });

  return {
    token,
    user: {
      id: employee._id,
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
      role: employee.role,
      department: employee.department,
      status: employee.status
    }
  };
}

async function getProfile(employeeId) {
  const employee = await EmployeeModel.findById(employeeId);
  if (!employee) {
    const err = new Error('Employee not found');
    err.statusCode = 404;
    throw err;
  }

  return {
    id: employee._id,
    employeeId: employee.employeeId,
    firstName: employee.firstName,
    lastName: employee.lastName,
    email: employee.email,
    role: employee.role,
    department: employee.department,
    status: employee.status,
    lastLoginAt: employee.lastLoginAt
  };
}

module.exports = { signup, login, getProfile };

