const { ActivityLogModel } = require('./activityLogs.service.models');

async function list(userId, query) {
  // Query filters can be added later.
  return ActivityLogModel.find({ user: userId }).sort({ createdAt: -1 }).limit(Number(query.limit || 100)).lean();
}

module.exports = { activityLogsService: { list } };

