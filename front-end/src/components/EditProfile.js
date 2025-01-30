import React, { useState } from "react";

function EditProfile() {
  const [userData, setUser] = useState({
    username: "",
    address: "",
    password: "",
    phone_number: "",
    email: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const customerId = localStorage.getItem("customerId");

  if (!customerId) {
    setError("No customer ID found. Please log in again.");
    return <p style={{ color: "red" }}>{error}</p>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Submitting data:", userData);
      const response = await fetch(
        `http://localhost:5000/customers/${customerId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );
      console.log("Response:", response);

      if (response.ok) {
        setUser({
          username: "",
          address: "",
          password: "",
          phone_number: "",
          email: "",
        });
        setMessage("Profile Updated Successfully!");
        setError("");
      } else {
        setError("An Error Occurred Updating User Profile");
      }
    } catch (err) {
      console.error("Something went wrong:", err);
      setError("Error Updating User Profile");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="username"
            id="name"
            value={userData.username}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            name="phone_number"
            id="phone"
            value={userData.phone_number}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={userData.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={userData.password}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            name="address"
            id="address"
            value={userData.address}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Edit Profile</button>
      </form>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default EditProfile;
