import Booking from "../models/book.model.js";
import Shop from "../models/shops.model.js";
import User from "../models/user.model.js";
import { errorHandler } from "../middleware/error.js";

export const createBooking = async (req, res, next) => {
  const { shopId, timeSlot, date } = req.body;

  try {
    const shop = await Shop.findById(shopId);
    if (!shop) return next(errorHandler(404, "Shop not found"));

    const bookingDate = new Date(date);
    const formattedDate = bookingDate.toISOString().split("T")[0];

    const selectedSlot = shop.timeSlots.find((slot) => {
      const slotDate = new Date(slot.date).toISOString().split("T")[0];

      return (
        slot.slot === timeSlot && slotDate === formattedDate && !slot.isBooked
      );
    });

    if (!selectedSlot) {
      return next(errorHandler(400, "Time slot is not available"));
    }

    const user = await User.findById(req.user.id);
    selectedSlot.isBooked = true;
    selectedSlot.bookedBy = req.user.id;
    selectedSlot.bookedByUsername = user.username;
    selectedSlot.bookedByUserEmail = user.email;
    const booking = new Booking({
      customer: req.user.id,
      shop: shopId,
      timeSlot: {
        slot: timeSlot,
        date: bookingDate,
      },
    });

    await shop.save();
    await booking.save();

    res.status(201).json({ message: "Booking created successfully", booking });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json(errorHandler(501, "Failed to create booking"));
  }
};

export const cancelBooking = async (req, res, next) => {
  const { bookId } = req.params;
  try {
    const booking = await Booking.findById(bookId);
    if (!booking) return next(errorHandler(404, "Booking not found"));
    const shop = await Shop.findById(booking.shop);
    if (!shop) return next(errorHandler(404, "Shop not found"));
    const slotToUpdate = shop.timeSlots.find(
      (slot) =>
        slot.slot === booking.timeSlot.slot &&
        new Date(slot.date).toISOString().split("T")[0] ===
          new Date(booking.timeSlot.date).toISOString().split("T")[0]
    );

    if (slotToUpdate) {
      slotToUpdate.isBooked = false;
      slotToUpdate.bookedBy = null;
      slotToUpdate.bookedByUsername = null;
      slotToUpdate.bookedByUserEmail = null;
      await shop.save();
    }
    await Booking.findByIdAndDelete(bookId);

    res.json({ message: "Booking canceled successfully" });
  } catch (error) {
    console.error("Error canceling booking:", error);
    res.status(500).json({ error: "Failed to cancel booking" });
  }
};

export const getBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ customer: req.user.id })
      .populate("shop")
      .exec();
    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
};
