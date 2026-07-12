const express = require('express');
const router = express.Router();

// Auth
router.use('/auth', require('../features/auth/auth.routes'));

// Dashboard
router.use('/dashboard', require('../features/dashboard/dashboard.routes'));

// Departments
router.use('/departments', require('../features/department/department.routes'));

// Asset Categories
router.use('/asset-categories', require('../features/assetCategory/assetCategory.routes'));

// Employees
router.use('/employees', require('../features/employee/employee.routes'));

// Assets
router.use('/assets', require('../features/asset/asset.routes'));

// Allocations
router.use('/allocations', require('../features/allocation/allocation.routes'));

// Transfers
router.use('/transfers', require('../features/transfer/transfer.routes'));

// Bookings
router.use('/bookings', require('../features/booking/booking.routes'));

// Maintenance
router.use('/maintenance', require('../features/maintenance/maintenance.routes'));

// AI
router.use('/ai', require('../features/ai/ai.routes'));

// Audits
router.use('/audits', require('../features/audit/audit.routes'));

// Reports
router.use('/reports', require('../features/reports/reports.routes'));

// Notifications
router.use('/notifications', require('../features/notifications/notifications.routes'));

// Activity Logs
router.use('/activity-logs', require('../features/activityLogs/activityLogs.routes'));

// Search
router.use('/search', require('../features/search/search.routes'));
//health
 router.use('/test', require('../health.js') )
module.exports = router;

