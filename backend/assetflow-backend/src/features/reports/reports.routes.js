const express = require('express');
const router = express.Router();

const { authMiddleware } = require('../../middleware/auth.middleware');
const { roleMiddleware } = require('../../middleware/role.middleware');
const { ROLES } = require('../../common/enums/roles');

const { reportsController } = require('./reports.controller');

const allowed = [ROLES.ADMIN, ROLES.ASSET_MANAGER, ROLES.DEPARTMENT_HEAD];

router.get('/assets', authMiddleware, roleMiddleware(allowed), reportsController.assetsReport);
router.get('/maintenance', authMiddleware, roleMiddleware(allowed), reportsController.maintenanceReport);
router.get('/booking', authMiddleware, roleMiddleware(allowed), reportsController.bookingReport);
router.get('/audit', authMiddleware, roleMiddleware(allowed), reportsController.auditReport);
router.get('/department', authMiddleware, roleMiddleware(allowed), reportsController.departmentReport);

module.exports = router;

