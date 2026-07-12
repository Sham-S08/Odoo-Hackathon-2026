const axios = require('axios');
const env = require('../../config/env');

async function getMaintenanceInsights(payload) {
  try {
    const resp = await axios.post(env.ai.maintenanceInsightsUrl, payload, { timeout: 10000 });
    return resp.data;
  } catch (err) {
    // Do not fail maintenance logic.
    return {
      fallback: true,
      message: 'AI service unavailable; returning fallback insights',
      details: err?.response?.data || err.message
    };
  }
}

module.exports = { aiService: { getMaintenanceInsights } };

