const { AuditModel } = require('./audit.service.models');

async function listAudits() {
  return AuditModel.find().lean();
}

async function createAudit(payload) {
  return AuditModel.create({ ...payload, status: 'Create Audit' });
}

async function startAudit(id) {
  const updated = await AuditModel.findByIdAndUpdate(id, { status: 'Assign Auditor' }, { new: true }).lean();
  if (!updated) {
    const err = new Error('Audit not found');
    err.statusCode = 404;
    throw err;
  }
  return updated;
}

async function verifyAudit(id, payload) {
  const updated = await AuditModel.findByIdAndUpdate(
    id,
    { status: 'Verification', verification: payload },
    { new: true }
  ).lean();

  if (!updated) {
    const err = new Error('Audit not found');
    err.statusCode = 404;
    throw err;
  }

  return updated;
}

async function closeAudit(id) {
  const updated = await AuditModel.findByIdAndUpdate(id, { status: 'Close Audit' }, { new: true }).lean();
  if (!updated) {
    const err = new Error('Audit not found');
    err.statusCode = 404;
    throw err;
  }

  // Placeholder for: update asset status automatically.
  return updated;
}

module.exports = { auditService: { listAudits, createAudit, startAudit, verifyAudit, closeAudit } };

