const express = require("express");
const mongoose = require("mongoose");
const { Rental, validateRent } = require("../models/rental");
const { Car, validate } = require("../models/car");
const { Customer, validatecust } = require("../models/customer");

const router = express.Router();

// GET all rentals
router.get("/", async (req, res) => {
  try {
    const rentals = await Rental.find().lean();
    res.status(200).json({ success: true, data: rentals });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Search rentals by car ID
router.get("/cars/search", async (req, res) => {
  try {
    const { carId } = req.query;

    if (!carId) {
      return res
        .status(400)
        .json({ success: false, message: "Car ID is required." });
    }

    if (!mongoose.Types.ObjectId.isValid(carId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Car ID format." });
    }

    const rentals = await Rental.find({ car: carId }).lean();

    if (rentals.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No rentals found for the given Car ID.",
      });
    }

    res.status(200).json({ success: true, data: rentals });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Search rentals by customer ID
router.get("/rent/search", async (req, res) => {
  try {
    const { customerId } = req.query;

    if (!customerId) {
      return res
        .status(400)
        .json({ success: false, message: "Customer ID is required." });
    }

    if (!mongoose.Types.ObjectId.isValid(customerId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Customer ID format." });
    }

    const rentals = await Rental.find({ customer: customerId }).lean();

    if (rentals.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No rentals found for the given Customer ID.",
      });
    }

    res.status(200).json({ success: true, data: rentals });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Get car details by car ID
router.get("/rent/:id", async (req, res) => {
  try {
    const car = await Car.findById(req.params.id).lean();

    if (!car) {
      return res
        .status(404)
        .json({ success: false, message: "Car not found." });
    }

    res.status(200).json({ success: true, data: car });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Rent a car
router.post("/rent/:carId", async (req, res) => {
  try {
    const { customerId, dateStart, dateEnd } = req.body;

    if (!customerId) {
      return res
        .status(400)
        .json({ success: false, message: "Customer ID is required." });
    }

    let car = await Car.findById(req.params.carId);
    if (!car) {
      return res
        .status(404)
        .json({ success: false, message: "Car not found." });
    }

    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res
        .status(404)
        .json({ success: false, message: "Customer not found." });
    }

    const rental = new Rental({
      car: req.params.carId,
      customer: customerId,
      rentedAt: dateStart,
      returnedAt: dateEnd,
    });

    car.customer = customerId;
    car.num_of_cars = car.num_of_cars - 1;
    car = await car.save();

    await Promise.all([rental.save(), car.save()]);

    res.status(201).json({
      success: true,
      message: "Car rented successfully!",
      data: { rental, car },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Return a rented car
router.post("/return/:rentalId", async (req, res) => {
  try {
    const { rentalId } = req.params;
    const rental = await Rental.findById(rentalId);
    if (!rental) {
      return res
        .status(404)
        .json({ success: false, message: "Rental not found." });
    }

    const customer = await Customer.findById(rental.customer);
    const car = await Car.findById(rental.car);
    if (!car) {
      return res
        .status(404)
        .json({ success: false, message: "Associated car not found." });
    }

    car.customer = null;
    rental.returnedAt = null;
    car.num_of_cars = car.num_of_cars + 1;
    await car.save();

    // Duration calculation (optional) - you can uncomment the following code if needed
    // const durationInMs = rental.returnedAt - rental.rentedAt;
    // rental.duration = Math.ceil(durationInMs / (1000 * 60)); // Duration in minutes

    await Promise.all([car.save(), rental.save(), customer.save()]);

    res.status(200).json({
      success: true,
      message: "Booking canceled!",
      data: { rental },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Calculate total payment
router.get("/payment/total_payment/:rentalId", async (req, res) => {
  try {
    const rental = await Rental.findById(req.params.rentalId);
    if (!rental) {
      return res
        .status(404)
        .json({ success: false, message: "Rental not found." });
    }

    const car = await Car.findById(rental.car);
    const customer = await Customer.findById(rental.customer);

    if (!car || !customer) {
      return res
        .status(404)
        .json({ success: false, message: "Car or customer not found." });
    }

    const totalPayment = car.paymentRate * rental.duration;
    customer.total_payment = totalPayment;

    await customer.save();

    res.status(200).json({
      success: true,
      message: `The total payment is $${totalPayment.toFixed(2)}.`,
      data: { totalPayment },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
