const mongoose = require('mongoose');
const { BookingSchema } = require('./booking.model');

const BookingModel = mongoose.models.Booking || mongoose.model('Booking', BookingSchema);

module.exports = { BookingModel };

