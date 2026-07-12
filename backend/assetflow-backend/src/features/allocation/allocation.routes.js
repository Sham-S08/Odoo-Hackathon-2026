const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../../middleware/auth.middleware');
const { roleMiddleware } = require('../../middleware/role.middleware');
const { ROLES } = require('../../common/enums/roles');
const { allocationController } = require('./allocation.controller');

router.get('/', authMiddleware, roleMiddleware([ROLES.ADMIN, ROLES.ASSET_MANAGER, ROLES.DEPARTMENT_HEAD]), allocationController.getAllocations);
router.post('/', authMiddleware, roleMiddleware([ROLES.ADMIN, ROLES.ASSET_MANAGER]), allocationController.createAllocation);
router.patch('/:id/return', authMiddleware, roleMiddleware([ROLES.ADMIN, ROLES.ASSET_MANAGER]), allocationController.returnAllocation);

module.exports = router;

