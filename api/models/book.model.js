import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    customer: {
      type: String,
      ref: "User",
      required: true,
    },
    shop: {
      type: String,
      ref: "Shop",
      required: true,
    },
    timeSlot: {
      slot: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        required: true,
      },
    },
    isConfirmed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Booking =
  mongoose.models.Booking || mongoose.model("Booking", BookingSchema);
export default Booking;
