const mongoose = require('mongoose');

const SearchSchema = new mongoose.Schema(
  {
    query: { type: String, default: '' }
  },
  { timestamps: true }
);

module.exports = { SearchSchema };

