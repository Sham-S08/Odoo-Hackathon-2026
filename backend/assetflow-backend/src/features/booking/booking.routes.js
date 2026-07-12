const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../../middleware/auth.middleware');
const { roleMiddleware } = require('../../middleware/role.middleware');
const { ROLES } = require('../../common/enums/roles');

const { bookingController } = require('./booking.controller');

router.get('/', authMiddleware, roleMiddleware([ROLES.ADMIN, ROLES.ASSET_MANAGER, ROLES.DEPARTMENT_HEAD, ROLES.EMPLOYEE]), bookingController.getBookings);
router.post('/', authMiddleware, roleMiddleware([ROLES.ADMIN, ROLES.ASSET_MANAGER, ROLES.EMPLOYEE]), bookingController.createBooking);
router.put('/:id', authMiddleware, roleMiddleware([ROLES.ADMIN, ROLES.ASSET_MANAGER]), bookingController.updateBooking);
router.delete('/:id', authMiddleware, roleMiddleware([ROLES.ADMIN, ROLES.ASSET_MANAGER]), bookingController.deleteBooking);
router.patch('/:id/cancel', authMiddleware, roleMiddleware([ROLES.ADMIN, ROLES.ASSET_MANAGER, ROLES.EMPLOYEE]), bookingController.cancelBooking);

module.exports = router;

