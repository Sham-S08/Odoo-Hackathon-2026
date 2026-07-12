const { asyncHandler } = require('../../common/helpers/asyncHandler');
const { success } = require('../../common/utils/response');
const { employeeService } = require('./employee.service');

const employeeController = {
  getEmployees: asyncHandler(async (req, res) => {
    const data = await employeeService.listEmployees();
    return success(res, { data, message: 'Employees fetched' });
  }),

  getEmployeeById: asyncHandler(async (req, res) => {
    const data = await employeeService.getEmployeeById(req.params.id);
    return success(res, { data, message: 'Employee fetched' });
  }),

  promoteEmployee: asyncHandler(async (req, res) => {
    const data = await employeeService.promoteEmployee(req.params.id, req.body);
    return success(res, { data, message: 'Employee promoted' });
  }),

  changeEmployeeStatus: asyncHandler(async (req, res) => {
    const data = await employeeService.changeStatus(req.params.id, req.body);
    return success(res, { data, message: 'Employee status updated' });
  })
};

module.exports = { employeeController };

