const { BookingModel } = require('./booking.service.models');

async function listBookings() {
  return BookingModel.find().lean();
}

async function createBooking(payload) {
  return BookingModel.create(payload);
}

async function updateBooking(id, payload) {
  const updated = await BookingModel.findByIdAndUpdate(id, payload, { new: true }).lean();
  if (!updated) {
    const err = new Error('Booking not found');
    err.statusCode = 404;
    throw err;
  }
  return updated;
}

async function deleteBooking(id) {
  const result = await BookingModel.findByIdAndDelete(id);
  if (!result) {
    const err = new Error('Booking not found');
    err.statusCode = 404;
    throw err;
  }
}

async function cancelBooking(id) {
  const updated = await BookingModel.findByIdAndUpdate(id, { status: 'Cancelled' }, { new: true }).lean();
  if (!updated) {
    const err = new Error('Booking not found');
    err.statusCode = 404;
    throw err;
  }
  return updated;
}

module.exports = { bookingService: { listBookings, createBooking, updateBooking, deleteBooking, cancelBooking } };

