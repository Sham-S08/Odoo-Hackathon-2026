const mongoose = require('mongoose');

// AI is kept separate; model is optional.
// This schema stores last request/response metadata if desired in future.
const AiInsightSchema = new mongoose.Schema(
  {
    request: { type: Object, default: {} },
    response: { type: Object, default: {} }
  },
  { timestamps: true }
);

module.exports = { AiInsightSchema };

