const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../../middleware/auth.middleware');
const { roleMiddleware } = require('../../middleware/role.middleware');
const { ROLES } = require('../../common/enums/roles');

const { departmentController } = require('./department.controller');

router.get('/', authMiddleware, departmentController.getDepartments);
router.post('/', authMiddleware, roleMiddleware([ROLES.ADMIN, ROLES.DEPARTMENT_HEAD]), departmentController.createDepartment);
router.put('/:id', authMiddleware, roleMiddleware([ROLES.ADMIN]), departmentController.updateDepartment);
router.delete('/:id', authMiddleware, roleMiddleware([ROLES.ADMIN]), departmentController.deleteDepartment);

module.exports = router;

