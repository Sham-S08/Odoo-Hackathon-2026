const mongoose = require('mongoose');

// Reports are generated dynamically; model is optional.
// Kept for feature completeness.
const ReportSchema = new mongoose.Schema(
  {
    kind: { type: String, default: '' },
    format: { type: String, default: '' }
  },
  { timestamps: true }
);

module.exports = { ReportSchema };

