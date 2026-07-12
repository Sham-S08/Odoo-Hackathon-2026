const { asyncHandler } = require('../../common/helpers/asyncHandler');
const { success } = require('../../common/utils/response');
const { searchService } = require('./search.service');

const searchController = {
  globalSearch: asyncHandler(async (req, res) => {
    const data = await searchService.searchAcrossAll(req.query.q, req.user);
    return success(res, { data, message: 'Search results fetched' });
  })
};

module.exports = { searchController };

