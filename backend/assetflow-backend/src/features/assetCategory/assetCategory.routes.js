const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../../middleware/auth.middleware');
const { roleMiddleware } = require('../../middleware/role.middleware');
const { ROLES } = require('../../common/enums/roles');
const { assetCategoryController } = require('./assetCategory.controller');

router.get('/', authMiddleware, assetCategoryController.getCategories);
router.post('/', authMiddleware, roleMiddleware([ROLES.ADMIN, ROLES.ASSET_MANAGER]), assetCategoryController.createCategory);
router.put('/:id', authMiddleware, roleMiddleware([ROLES.ADMIN, ROLES.ASSET_MANAGER]), assetCategoryController.updateCategory);
router.delete('/:id', authMiddleware, roleMiddleware([ROLES.ADMIN]), assetCategoryController.deleteCategory);

module.exports = router;

