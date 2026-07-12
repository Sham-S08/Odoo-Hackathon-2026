const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema(
  {
    asset: { type: mongoose.Schema.Types.ObjectId, ref: 'Asset', required: true },
    bookedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },

    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },

    status: { type: String, default: 'Upcoming', enum: ['Upcoming', 'Ongoing', 'Completed', 'Cancelled'] }
  },
  { timestamps: true }
);

module.exports = { BookingSchema };

