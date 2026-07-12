async function searchAcrossAll(q) {
  // Placeholder: search should query Assets, Departments, Employees, Bookings, Maintenance.
  return {
    query: q || '',
    results: [],
    placeholder: true
  };
}

module.exports = { searchService: { searchAcrossAll } };

