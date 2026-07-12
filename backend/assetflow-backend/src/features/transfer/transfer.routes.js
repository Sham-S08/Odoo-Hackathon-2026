const express = require('express');
const router = express.Router();

const { authMiddleware } = require('../../middleware/auth.middleware');
const { roleMiddleware } = require('../../middleware/role.middleware');
const { ROLES } = require('../../common/enums/roles');

const { transferController } = require('./transfer.controller');

router.get('/', authMiddleware, roleMiddleware([ROLES.ADMIN, ROLES.ASSET_MANAGER, ROLES.DEPARTMENT_HEAD]), transferController.getTransfers);
router.post('/', authMiddleware, roleMiddleware([ROLES.ADMIN, ROLES.ASSET_MANAGER]), transferController.createTransfer);

router.patch('/:id/approve', authMiddleware, roleMiddleware([ROLES.ADMIN, ROLES.ASSET_MANAGER]), transferController.approveTransfer);
router.patch('/:id/reject', authMiddleware, roleMiddleware([ROLES.ADMIN, ROLES.ASSET_MANAGER]), transferController.rejectTransfer);

module.exports = router;

