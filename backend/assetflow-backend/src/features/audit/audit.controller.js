const { asyncHandler } = require('../../common/helpers/asyncHandler');
const { success } = require('../../common/utils/response');
const { auditService } = require('./audit.service');

const auditController = {
  getAudits: asyncHandler(async (req, res) => {
    const data = await auditService.listAudits(req.query);
    return success(res, { data, message: 'Audits fetched' });
  }),

  createAudit: asyncHandler(async (req, res) => {
    const data = await auditService.createAudit(req.body);
    return success(res, { statusCode: 201, data, message: 'Audit created' });
  }),

  startAudit: asyncHandler(async (req, res) => {
    const data = await auditService.startAudit(req.params.id);
    return success(res, { data, message: 'Audit started' });
  }),

  verifyAudit: asyncHandler(async (req, res) => {
    const data = await auditService.verifyAudit(req.params.id, req.body);
    return success(res, { data, message: 'Audit verified' });
  }),

  closeAudit: asyncHandler(async (req, res) => {
    const data = await auditService.closeAudit(req.params.id);
    return success(res, { data, message: 'Audit closed' });
  })
};

module.exports = { auditController };

