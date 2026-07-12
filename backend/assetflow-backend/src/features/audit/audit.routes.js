const express = require('express');
const router = express.Router();

const { authMiddleware } = require('../../middleware/auth.middleware');
const { roleMiddleware } = require('../../middleware/role.middleware');
const { ROLES } = require('../../common/enums/roles');

const { auditController } = require('./audit.controller');

router.get('/', authMiddleware, roleMiddleware([ROLES.ADMIN, ROLES.ASSET_MANAGER, ROLES.DEPARTMENT_HEAD]), auditController.getAudits);
router.post('/', authMiddleware, roleMiddleware([ROLES.ADMIN, ROLES.ASSET_MANAGER]), auditController.createAudit);

router.patch('/:id/start', authMiddleware, roleMiddleware([ROLES.ADMIN, ROLES.DEPARTMENT_HEAD, ROLES.ASSET_MANAGER]), auditController.startAudit);
router.patch('/:id/close', authMiddleware, roleMiddleware([ROLES.ADMIN, ROLES.DEPARTMENT_HEAD, ROLES.ASSET_MANAGER]), auditController.closeAudit);

router.post('/:id/verify', authMiddleware, roleMiddleware([ROLES.ADMIN, ROLES.ASSET_MANAGER, ROLES.DEPARTMENT_HEAD]), auditController.verifyAudit);

module.exports = router;

