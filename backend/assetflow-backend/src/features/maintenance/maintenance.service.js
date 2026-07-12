const { MaintenanceModel } = require('./maintenance.service.models');

async function list() {
  return MaintenanceModel.find().lean();
}

async function create(payload) {
  return MaintenanceModel.create({ ...payload, status: 'Pending' });
}

async function approve(id) {
  const updated = await MaintenanceModel.findByIdAndUpdate(id, { status: 'Approved' }, { new: true }).lean();
  if (!updated) {
    const err = new Error('Maintenance not found');
    err.statusCode = 404;
    throw err;
  }
  return updated;
}

async function reject(id) {
  const updated = await MaintenanceModel.findByIdAndUpdate(id, { status: 'Rejected' }, { new: true }).lean();
  if (!updated) {
    const err = new Error('Maintenance not found');
    err.statusCode = 404;
    throw err;
  }
  return updated;
}

async function assignTechnician(id, payload) {
  const updated = await MaintenanceModel.findByIdAndUpdate(id, { technician: payload.technician }, { new: true }).lean();
  if (!updated) {
    const err = new Error('Maintenance not found');
    err.statusCode = 404;
    throw err;
  }
  return updated;
}

async function resolve(id) {
  const updated = await MaintenanceModel.findByIdAndUpdate(id, { status: 'Resolved' }, { new: true }).lean();
  if (!updated) {
    const err = new Error('Maintenance not found');
    err.statusCode = 404;
    throw err;
  }
  return updated;
}

module.exports = { maintenanceService: { list, create, approve, reject, assignTechnician, resolve } };

