const { DepartmentModel } = require('./department.service.models');

async function listDepartments() {
  return DepartmentModel.find().lean();
}

async function createDepartment(payload) {
  return DepartmentModel.create(payload);
}

async function updateDepartment(id, payload) {
  const updated = await DepartmentModel.findByIdAndUpdate(id, payload, { new: true });
  if (!updated) {
    const err = new Error('Department not found');
    err.statusCode = 404;
    throw err;
  }
  return updated;
}

async function deleteDepartment(id) {
  const result = await DepartmentModel.findByIdAndDelete(id);
  if (!result) {
    const err = new Error('Department not found');
    err.statusCode = 404;
    throw err;
  }
}

module.exports = { departmentService: { listDepartments, createDepartment, updateDepartment, deleteDepartment } };

