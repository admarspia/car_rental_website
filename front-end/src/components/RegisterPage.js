import React, { useState } from "react";
import { Button } from "react-bootstrap";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone_number: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    try {
      const response = await fetch("http://localhost:5000/customers/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage("Registration successful!");
        setFormData({
          name: "",
          address: "",
          phone_number: "",
          email: "",
          password: "",
        });
      } else {
        setMessage(result.message || "Registration failed. Please try again.");
      }
    } catch (err) {
      console.error("Error during registration:", err);
      setMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="register-container">
      <form className="registering-form" onSubmit={handleSubmit}>
        <h2 className="text-center mb-4">Register</h2>
        {message && <p className="alert alert-info">{message}</p>}

        <div className="mb-3">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="phone_number">Phone Number</label>
          <input
            type="tel"
            id="phone_number"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>

        <Button type="submit" className="btn btn-primary w-100">
          Register
        </Button>
      </form>
    </div>
  );
}

export default Register;
