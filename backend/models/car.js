const mongoose = require("mongoose");
const Joi = require("joi");

// Define the Car schema and model
const Car = mongoose.model(
  "car",
  mongoose.Schema({
    make: {
      type: String,
      maxlength: 255,
      minlength: 3,
      required: true,
    },
    model: {
      type: String,
      maxlength: 255,
      minlength: 2,
      required: true,
    },
    year: {
      type: Number,
      maxlength: 4,
      minlength: 4,
      required: true,
    },
    is_available: {
      type: Boolean,
    },
    paymentRate: {
      type: Number,
      required: true,
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      default: null,
    },
    text: {
      type: String,
    },
    imageUrl: {
      type: String,
      minlength: 3,
      maxlength: 1024,
    },
    num_of_cars: {
      type: Number,
      default: 1,
    },
  })
);

// Validation function for car input
function validateCar(car) {
  const schema = Joi.object({
    make: Joi.string().max(255).min(3).required(),
    model: Joi.string().max(255).min(2).required(),
    year: Joi.number().min(1886).max(new Date().getFullYear()).required(),
    paymentRate: Joi.number().required(),
    imageUrl: Joi.string().min(3).max(1024),
    text: Joi.string(),
    num_of_cars: Joi.number(),
  });

  return schema.validate(car);
}

module.exports = { Car, validate: validateCar };
