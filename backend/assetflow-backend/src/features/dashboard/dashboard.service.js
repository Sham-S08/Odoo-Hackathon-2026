async function getDashboard(userId) {
  // TODO: implement with real queries once models exist.
  return {
    assetsAvailable: 0,
    assetsAllocated: 0,
    maintenanceToday: 0,
    activeBookings: 0,
    pendingTransfers: 0,
    upcomingReturns: 0,
    overdueReturns: 0,
    auditCount: 0
  };
}

module.exports = { dashboardService: { getDashboard } };

