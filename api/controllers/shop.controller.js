import { errorHandler } from "../middleware/error.js";
import Shop from "../models/shops.model.js";

export const createShop = async (req, res) => {
  const { name, location, imageUrls } = req.body;
  try {
    const newShop = new Shop({
      owner: req.user.id,
      name,
      location,
      imageUrls,
    });
    await newShop.save();
    res.status(201).json({ message: "Shop created successfully", newShop });
  } catch (error) {
    console.error("Error creating shop:", error);
    res.status(500).json(errorHandler(501, "Failed to create shop"));
  }
};

export const updateShop = async (req, res, next) => {
  const { shopId } = req.params;
  const updates = req.body;

  try {
    const shop = await Shop.findByIdAndUpdate(shopId, updates, { new: true });
    if (!shop) return next(errorHandler(404, "Shop not found"));

    res.json({ message: "Shop updated successfully", shop });
  } catch (error) {
    console.error("Error updating shop:", error);
    res.status(500).json({ error: "Failed to update shop" });
  }
};

export const deleteShop = async (req, res, next) => {
  const { shopId } = req.params;

  try {
    const shop = await Shop.findByIdAndDelete(shopId);
    if (!shop) return next(errorHandler(404, "Shop not found"));
    res.json({ message: "Shop deleted successfully" });
  } catch (error) {
    console.error("Error deleting shop:", error);
    res.status(500).json({ error: "Failed to delete shop" });
  }
};
export const getShop = async (req, res, next) => {
  const { shopId } = req.params;
  try {
    const shop = await Shop.findById(shopId);
    if (!shop) {
      return next(errorHandler(404, "Listing not found"));
    }
    return res.status(200).json(shop);
  } catch (error) {}
};

export const addTimeSlots = async (req, res, next) => {
  const { shopId } = req.params;
  const { date, timeSlots, seats } = req.body;

  try {
    const shop = await Shop.findById(shopId);
    if (!shop) return next(errorHandler(404, "Shop not found"));
    shop.timeSlots = shop.timeSlots.filter(
      (slot) =>
        new Date(slot.date).toISOString().split("T")[0] !==
        new Date(date).toISOString().split("T")[0]
    );
    const newSlots = [];
    for (let seat = 1; seat <= seats; seat++) {
      timeSlots.forEach((slot) => {
        newSlots.push({
          slot,
          seatNumber: seat,
          date,
        });
      });
    }

    shop.timeSlots.push(...newSlots);
    await shop.save();

    res.json({ message: "Time slots added successfully", shop });
  } catch (error) {
    console.error("Error adding time slots:", error);
    res.status(500).json({ error: "Failed to add time slots" });
  }
};
export const updateTimeSlots = async (req, res, next) => {
  const { shopId } = req.params;
  const { date, timeSlots, seats } = req.body;

  try {
    const shop = await Shop.findById(shopId);
    if (!shop) return next(errorHandler(404, "Shop not found"));
    shop.timeSlots = shop.timeSlots.filter(
      (slot) =>
        new Date(slot.date).toISOString().split("T")[0] !==
        new Date(date).toISOString().split("T")[0]
    );
    const updatedSlots = [];
    for (let seat = 1; seat <= seats; seat++) {
      timeSlots.forEach((slot) => {
        updatedSlots.push({
          slot,
          seatNumber: seat,
          date,
        });
      });
    }

    shop.timeSlots.push(...updatedSlots);
    await shop.save();

    res.json({ message: "Time slots updated successfully", shop });
  } catch (error) {
    console.error("Error updating time slots:", error);
    res.status(500).json({ error: "Failed to update time slots" });
  }
};
export const deleteTimeSlots = async (req, res, next) => {
  const { shopId } = req.params;
  const { date, seatNumber } = req.body;

  try {
    const shop = await Shop.findById(shopId);
    if (!shop) return next(errorHandler(404, "Shop not found"));

    shop.timeSlots = shop.timeSlots.filter((slot) => {
      const isSameDate =
        new Date(slot.date).toISOString().split("T")[0] ===
        new Date(date).toISOString().split("T")[0];
      const isSameSeat = seatNumber ? slot.seatNumber === seatNumber : true;
      console.log(isSameDate);
      return !(isSameDate && isSameSeat);
    });

    await shop.save();

    res.json({ message: "Time slots deleted successfully", shop });
  } catch (error) {
    console.error("Error deleting time slots:", error);
    res.status(500).json({ error: "Failed to delete time slots" });
  }
};
