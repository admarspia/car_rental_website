const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cars = require("./route/cars");
const customers = require("./route/customer");
const rentals = require("./route/rentals");
const dotenv = require('dotenv')

dotenv.config()
const app = express();
app.use(cors());


app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000", 
    methods: ["GET", "POST", "PUT", "DELETE"], 
    allowedHeaders: ["Content-Type", "Authorization"], 
  })
);

mongoose
  .connect("mongodb://localhost:27017/cars", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to the database"))
  .catch((err) => console.error("Database connection failed:", err));

// Routes
app.use("/customers", customers);
app.use("/cars", cars);
app.use("/rentals", rentals);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
