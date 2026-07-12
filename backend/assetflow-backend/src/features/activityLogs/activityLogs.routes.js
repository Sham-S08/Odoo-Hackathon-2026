const express = require('express');
const router = express.Router();

const { authMiddleware } = require('../../middleware/auth.middleware');
const { roleMiddleware } = require('../../middleware/role.middleware');
const { ROLES } = require('../../common/enums/roles');

const { activityLogsController } = require('./activityLogs.controller');

router.get('/', authMiddleware, roleMiddleware([ROLES.ADMIN, ROLES.ASSET_MANAGER, ROLES.DEPARTMENT_HEAD, ROLES.EMPLOYEE]), activityLogsController.getLogs);

module.exports = router;

