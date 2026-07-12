const { signup, login, getProfile } = require('./auth.service');
const { asyncHandler } = require('../../common/helpers/asyncHandler');
const { success } = require('../../common/utils/response');


const authController = {
  signup: asyncHandler(async (req, res) => {
    const { firstName, lastName, email, password, department, employeeId, status } = req.body;

    const result = await signup({ firstName, lastName, email, password, department, employeeId, status });

    return success(res, { statusCode: 201, message: 'Employee created', data: result });
  }),

  login: asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const result = await login({ email, password });

    return success(res, { statusCode: 200, message: 'Login successful', data: result });
  }),

  profile: asyncHandler(async (req, res) => {
    const employeeId = req.user?.id;
    const result = await getProfile(employeeId);

    return success(res, { statusCode: 200, message: 'Profile fetched', data: result });
  })
};

module.exports = { authController };

