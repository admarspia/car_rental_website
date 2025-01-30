const mongoose = require("mongoose");
const Joi = require("joi");

// Define the Customer schema and model
const Customer = mongoose.model(
  "customer",
  mongoose.Schema({
    name: {
      type: String,
      maxlength: 255,
      minlength: 3,
      required: true,
    },
    address: {
      type: String,
      maxlength: 255,
      minlength: 3,
      required: true,
    },
    phone_number: {
      type: String,
      maxlength: 10,
      minlength: 10,
      required: true,
    },
    password: {
      type: String,
      maxlength: 255,
      required: true,
    },
    email: {
      type: String,
      minlength: 5,
      maxlength: 255,
      required: true,
    },
    total_payment: {
      type: Number,
      default: 0.0,
    },
  })
);

// Validation function for customer input
function validateCustomer(customer) {
  const schema = Joi.object({
    name: Joi.string().max(255).min(3).required(),
    address: Joi.string().max(255).min(3).required(),
    phone_number: Joi.string().max(10).min(10).required(),
    password: Joi.string().min(8).max(255).required(),
    email: Joi.string().email().min(5).max(255).required(),
  });
  return schema.validate(customer);
}

module.exports = { Customer, validate: validateCustomer };
