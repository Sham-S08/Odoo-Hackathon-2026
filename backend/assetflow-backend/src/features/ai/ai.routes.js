const express = require('express');
const router = express.Router();

const { authMiddleware } = require('../../middleware/auth.middleware');
const { roleMiddleware } = require('../../middleware/role.middleware');
const { ROLES } = require('../../common/enums/roles');

const { aiController } = require('./ai.controller');

router.post(
  '/maintenance-insights',
  authMiddleware,
  roleMiddleware([ROLES.ADMIN, ROLES.ASSET_MANAGER, ROLES.DEPARTMENT_HEAD]),
  aiController.maintenanceInsights
);

module.exports = router;

