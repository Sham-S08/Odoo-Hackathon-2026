const { asyncHandler } = require('../../common/helpers/asyncHandler');
const { success } = require('../../common/utils/response');
const { departmentService } = require('./department.service');

const departmentController = {
  getDepartments: asyncHandler(async (req, res) => {
    const data = await departmentService.listDepartments();
    return success(res, { data, message: 'Departments fetched' });
  }),

  createDepartment: asyncHandler(async (req, res) => {
    const data = await departmentService.createDepartment(req.body);
    return success(res, { statusCode: 201, data, message: 'Department created' });
  }),

  updateDepartment: asyncHandler(async (req, res) => {
    const data = await departmentService.updateDepartment(req.params.id, req.body);
    return success(res, { data, message: 'Department updated' });
  }),

  deleteDepartment: asyncHandler(async (req, res) => {
    await departmentService.deleteDepartment(req.params.id);
    return success(res, { message: 'Department deleted' });
  })
};

module.exports = { departmentController };

