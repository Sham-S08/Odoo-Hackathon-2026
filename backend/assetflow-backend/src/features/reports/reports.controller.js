const { asyncHandler } = require('../../common/helpers/asyncHandler');
const { success } = require('../../common/utils/response');
const { reportsService } = require('./reports.service');

const reportsController = {
  assetsReport: asyncHandler(async (req, res) => {
    const data = await reportsService.generateReport('assets', req.query);
    return success(res, { data, message: 'Assets report exported' });
  }),
  maintenanceReport: asyncHandler(async (req, res) => {
    const data = await reportsService.generateReport('maintenance', req.query);
    return success(res, { data, message: 'Maintenance report exported' });
  }),
  bookingReport: asyncHandler(async (req, res) => {
    const data = await reportsService.generateReport('booking', req.query);
    return success(res, { data, message: 'Booking report exported' });
  }),
  auditReport: asyncHandler(async (req, res) => {
    const data = await reportsService.generateReport('audit', req.query);
    return success(res, { data, message: 'Audit report exported' });
  }),
  departmentReport: asyncHandler(async (req, res) => {
    const data = await reportsService.generateReport('department', req.query);
    return success(res, { data, message: 'Department report exported' });
  })
};


module.exports = { reportsController };

