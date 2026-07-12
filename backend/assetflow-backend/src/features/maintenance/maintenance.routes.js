const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../../middleware/auth.middleware');
const { roleMiddleware } = require('../../middleware/role.middleware');
const { ROLES } = require('../../common/enums/roles');
const { maintenanceController } = require('./maintenance.controller');

router.get('/', authMiddleware, roleMiddleware([ROLES.ADMIN, ROLES.ASSET_MANAGER, ROLES.DEPARTMENT_HEAD]), maintenanceController.getMaintenance);
router.post('/', authMiddleware, roleMiddleware([ROLES.ADMIN, ROLES.ASSET_MANAGER, ROLES.EMPLOYEE, ROLES.DEPARTMENT_HEAD]), maintenanceController.createMaintenance);

router.patch('/:id/approve', authMiddleware, roleMiddleware([ROLES.ADMIN, ROLES.ASSET_MANAGER]), maintenanceController.approveMaintenance);
router.patch('/:id/reject', authMiddleware, roleMiddleware([ROLES.ADMIN, ROLES.ASSET_MANAGER]), maintenanceController.rejectMaintenance);

router.patch('/:id/assign-technician', authMiddleware, roleMiddleware([ROLES.ADMIN, ROLES.ASSET_MANAGER]), maintenanceController.assignTechnician);
router.patch('/:id/resolve', authMiddleware, roleMiddleware([ROLES.ADMIN, ROLES.ASSET_MANAGER]), maintenanceController.resolveMaintenance);

module.exports = router;

