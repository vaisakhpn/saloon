import mongoose from "mongoose";

const ShopSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    owner: {
      type: String,
      required: true,
    },
    timeSlots: [
      {
        slot: String,
        seatNumber: String,
        isBooked: { type: Boolean, default: false },
        bookedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        bookedByUsername: { type: String },
        bookedByUserEmail: { type: String },
        date: Date,
      },
    ],
    likes: {
      type: Number,
      default: 0,
    },
    holidays: [Date],
    imageUrls: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);

const Shop = mongoose.model.Shop || mongoose.model("Shop", ShopSchema);
export default Shop;
