const mongoose = require("mongoose");
const Joi = require("joi");
const bcrypt = require('bcryptjs');
// Define the Customer schema and model

const customerSchema = new mongoose.Schema({
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

customerSchema.pre("save", async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next()
})

customerSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Customer = mongoose.model('Customer', customerSchema);

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

module.exports = { Customer, validateCust: validateCustomer };
