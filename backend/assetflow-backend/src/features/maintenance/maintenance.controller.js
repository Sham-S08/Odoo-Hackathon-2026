const { asyncHandler } = require('../../common/helpers/asyncHandler');
const { success } = require('../../common/utils/response');
const { maintenanceService } = require('./maintenance.service');

const maintenanceController = {
  getMaintenance: asyncHandler(async (req, res) => {
    const data = await maintenanceService.list();
    return success(res, { data, message: 'Maintenance fetched' });
  }),

  createMaintenance: asyncHandler(async (req, res) => {
    const data = await maintenanceService.create(req.body);
    return success(res, { statusCode: 201, data, message: 'Maintenance created' });
  }),

  approveMaintenance: asyncHandler(async (req, res) => {
    const data = await maintenanceService.approve(req.params.id);
    return success(res, { data, message: 'Maintenance approved' });
  }),

  rejectMaintenance: asyncHandler(async (req, res) => {
    const data = await maintenanceService.reject(req.params.id);
    return success(res, { data, message: 'Maintenance rejected' });
  }),

  assignTechnician: asyncHandler(async (req, res) => {
    const data = await maintenanceService.assignTechnician(req.params.id, req.body);
    return success(res, { data, message: 'Technician assigned' });
  }),

  resolveMaintenance: asyncHandler(async (req, res) => {
    const data = await maintenanceService.resolve(req.params.id);
    return success(res, { data, message: 'Maintenance resolved' });
  })
};

module.exports = { maintenanceController };

