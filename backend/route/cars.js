const express = require("express");
const mongoose = require("mongoose");
const { Car, validate } = require("../models/car");

const router = express.Router();

// GET all cars
router.get("/", async (req, res) => {
  try {
    const cars = await Car.find();
    if (!cars || cars.length === 0)
      return res.status(404).send("No available cars...");
    res.send(cars);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// GET cars by search parameters
router.get("/search", async (req, res) => {
  try {
    const { model, make, year } = req.query;

    const filter = {};

    // Apply filters based on query parameters
    if (model) filter.model = model;
    if (make) filter.make = new RegExp(make, "i"); // Case-insensitive search
    if (year) filter.year = year;

    if (Object.keys(filter).length === 0) {
      return res
        .status(400)
        .send("Invalid search query. Please provide valid attributes.");
    }

    const car = await Car.find(filter);
    if (car.length === 0)
      return res
        .status(404)
        .send("The car with the given Attribute(s) not found.");
    res.status(200).json({ success: true, data: car });

  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// POST a new car
router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let car = new Car({
      make: req.body.make,
      model: req.body.model,
      year: req.body.year,
      paymentRate: req.body.paymentRate,
      imageUrl: req.body.imageUrl,
      text: req.body.text,
      num_of_cars: req.body.num_of_cars,
    });

    car = await car.save();
    res.send(car);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// PUT to update a car
router.put("/:id", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const car = await Car.findByIdAndUpdate(
      req.params.id,
      {
        make: req.body.make,
        model: req.body.model,
        year: req.body.year,
        imageUrl: req.body.imageUrl,
        text: req.body.text,
      },
      { new: true }
    );

    if (!car)
      return res.status(404).send("The car with the given ID was not found.");

    res.send(car);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// DELETE a car
router.delete("/:id", async (req, res) => {
  try {
    const car = await Car.findByIdAndDelete(req.params.id);
    if (!car)
      return res.status(404).send("The car with the given ID was not found.");
    res.send(car);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// GET a car by ID
router.get("/:id", async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car)
      return res.status(404).send("The car with the given ID was not found.");
    res.send(car);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
