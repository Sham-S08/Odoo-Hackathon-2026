const express = require('express');
const router = express.Router();

const { authMiddleware } = require('../../middleware/auth.middleware');
const { roleMiddleware } = require('../../middleware/role.middleware');
const { ROLES } = require('../../common/enums/roles');

const { employeeController } = require('./employee.controller');

router.get('/', authMiddleware, roleMiddleware([ROLES.ADMIN, ROLES.DEPARTMENT_HEAD, ROLES.ASSET_MANAGER]), employeeController.getEmployees);
router.get('/:id', authMiddleware, employeeController.getEmployeeById);

router.patch('/:id/promote', authMiddleware, roleMiddleware([ROLES.ADMIN]), employeeController.promoteEmployee);
router.patch('/:id/status', authMiddleware, roleMiddleware([ROLES.ADMIN, ROLES.DEPARTMENT_HEAD]), employeeController.changeEmployeeStatus);

module.exports = router;

