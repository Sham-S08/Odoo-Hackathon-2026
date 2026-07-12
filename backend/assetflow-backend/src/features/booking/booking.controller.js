const { asyncHandler } = require('../../common/helpers/asyncHandler');
const { success } = require('../../common/utils/response');
const { bookingService } = require('./booking.service');

const bookingController = {
  getBookings: asyncHandler(async (req, res) => {
    const data = await bookingService.listBookings(req.query);
    return success(res, { data, message: 'Bookings fetched' });
  }),

  createBooking: asyncHandler(async (req, res) => {
    const data = await bookingService.createBooking(req.body);
    return success(res, { statusCode: 201, data, message: 'Booking created' });
  }),

  updateBooking: asyncHandler(async (req, res) => {
    const data = await bookingService.updateBooking(req.params.id, req.body);
    return success(res, { data, message: 'Booking updated' });
  }),

  deleteBooking: asyncHandler(async (req, res) => {
    await bookingService.deleteBooking(req.params.id);
    return success(res, { message: 'Booking deleted' });
  }),

  cancelBooking: asyncHandler(async (req, res) => {
    const data = await bookingService.cancelBooking(req.params.id);
    return success(res, { data, message: 'Booking cancelled' });
  })
};

module.exports = { bookingController };

