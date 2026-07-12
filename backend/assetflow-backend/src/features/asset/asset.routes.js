const express = require('express');
const router = express.Router();

const { authMiddleware } = require('../../middleware/auth.middleware');
const { roleMiddleware } = require('../../middleware/role.middleware');
const { ROLES } = require('../../common/enums/roles');

const { assetController } = require('./asset.controller');

router.get('/', authMiddleware, roleMiddleware([ROLES.ADMIN, ROLES.ASSET_MANAGER, ROLES.DEPARTMENT_HEAD, ROLES.EMPLOYEE]), assetController.getAssets);
router.get('/:id', authMiddleware, assetController.getAssetById);

router.post('/', authMiddleware, roleMiddleware([ROLES.ADMIN, ROLES.ASSET_MANAGER]), assetController.createAsset);
router.put('/:id', authMiddleware, roleMiddleware([ROLES.ADMIN, ROLES.ASSET_MANAGER]), assetController.updateAsset);
router.delete('/:id', authMiddleware, roleMiddleware([ROLES.ADMIN]), assetController.deleteAsset);

router.get('/:id/history', authMiddleware, assetController.getAssetHistory);

module.exports = router;

