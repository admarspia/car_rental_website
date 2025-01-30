const express = require("express");
const { Customer, validateCustomer } = require("../models/customer"); // Correct import
const router = express.Router();

// GET customers based on search query (name, email)
router.get("/search", async (req, res) => {
  try {
    const { name, email } = req.query;

    const filter = {};
    if (name) filter.name = new RegExp(name, "i"); // Case-insensitive search
    if (email) filter.email = new RegExp(email, "i"); // Case-insensitive search

    const customers = await Customer.find(filter)
      .exec();

    if (!customers.length) return res.status(404).send("Customer not found");

    res.send(customers);
  } catch (err) {
    console.error("Error searching customer:", err.message);
    res.status(500).send("Server Error");
  }
});

// GET all customers
router.get("/", async (req, res) => {
  try {
    const customers = await Customer.find();
    if (!customers.length) return res.status(404).send("No customers found!");
    res.send(customers);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

// POST a new customer (register)
router.post("/register", async (req, res) => {
  try {
    const { error } = validateCustomer(req.body); // Validate input data
    if (error) return res.status(400).send(error.details[0].message); // Handle validation errors

    const customer = new Customer({
      name: req.body.name,
      address: req.body.address,
      phone_number: req.body.phone_number,
      email: req.body.email,
      password: req.body.password,
    });

    await customer.save();
    res.send(customer);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

// PUT to update a customer
router.put("/:id", async (req, res) => {
  try {
    const { error } = validateCustomer(req.body); // Validate input data
    if (error) return res.status(400).send(error.details[0].message); // Handle validation errors

    const customer = await Customer.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        address: req.body.address,
        phone_number: req.body.phone_number,
        email: req.body.email,
        password: req.body.password,
      },
      { new: true }
    );

    if (!customer) return res.status(404).send("Customer not found!");
    res.send(customer);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

// DELETE a customer
router.delete("/:id", async (req, res) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id);
    if (!customer) return res.status(404).send("Customer not found!");
    res.send("Account deleted successfully!");
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

// POST for login (authenticate customer)
router.post("/login", async (req, res) => {
  try {
    const { name, password } = req.body;
    const customer = await Customer.findOne({ name });

    if (!customer || customer.password !== password)
      return res.status(401).send({ message: "Invalid credentials" });

    res.send({ message: "Login successful.", customerId: customer._id });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).send({ message: "Server error. Please try again later." });
  }
});

// GET customer by ID
router.get("/:id", async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer)
      return res
        .status(404)
        .send("The customer with the given ID was not found.");
    res.send(customer);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
