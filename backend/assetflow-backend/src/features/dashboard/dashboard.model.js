const mongoose = require('mongoose');

// No dedicated collection yet; placeholder for enterprise structure.
// Mongoose requires at least one model file per spec.
const DashboardSchema = new mongoose.Schema({}, { timestamps: true });

module.exports = { DashboardSchema };

