const mongoose = require('mongoose');
const { ActivityLogSchema } = require('./activityLogs.model');

const ActivityLogModel = mongoose.models.ActivityLog || mongoose.model('ActivityLog', ActivityLogSchema);

module.exports = { ActivityLogModel };

