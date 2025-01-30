const mongoose = require("mongoose");
const Joi = require("joi");

// Define the Customer schema and model
const Rental = mongoose.model(
  "rental",
  mongoose.Schema({
    car: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Car",
      default:null
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      default:null
    },
    rentedAt: {
      type: Date,
    },
    returnedAt: {
      type: Date,
      default:null
    },
    duration: {
      type: Number,
    },
  })
);

// Validation function for customer input
function validateRental(rental) {
  const schema = Joi.object({
    rentedAt: Joi.date(),
    returnedAt: Joi.date(),
    duration: Joi.number()
  });
  return schema.validate(rental);
}

module.exports = { Rental, validateRent: validateRental };
