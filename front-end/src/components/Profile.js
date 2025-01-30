import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

function Profile() {
  const [customer, setCustomer] = useState(null);
  const [rentals, setRentals] = useState([]);
  const [cars, setCars] = useState({});
  const [messages, setMessages] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [rentalError, setRentalError] = useState("");
  const navigate = useNavigate();
  const customerId = localStorage.getItem("customerId");

  useEffect(() => {
    if (!customerId) {
      alert("You need to log in first.");
      setError("You need to log in first.");
      navigate("/login");
      return;
    }

    const fetchCustomer = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/customers/${customerId}`
        );
        if (!response.ok) throw new Error("Failed to fetch customer");
        const customerData = await response.json();
        setCustomer(customerData);
      } catch (err) {
        console.error("Error fetching customer:", err);
        setError("An error occurred while fetching customer data.");
      }
    };

    const fetchRentals = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/rentals/rent/search?customerId=${customerId}`
        );
        if (!response.ok) {
          const errorData = await response.json();
          setRentalError(errorData.message || "Failed to fetch rentals!");
          return;
        }
        const rentalResponseData = await response.json();
        const rentalData = rentalResponseData.data || [];
        setRentals(rentalData);

        if (!Array.isArray(rentalData)) {
          throw new Error(
            "Unexpected response format: Rentals data is not an array"
          );
        }

        // Fetch car details for each rental and map by rental ID
        const carDetails = {};
        await Promise.all(
          rentalData.map(async (rental) => {
            try {
              const carResponse = await fetch(
                `http://localhost:5000/cars/${rental.car}`
              );
              const carData = await carResponse.json();
              carDetails[rental._id] = carData;
            } catch (err) {
              console.error(
                "Error fetching car details for rental:",
                rental._id,
                err
              );
              carDetails[rental._id] = {
                make: "Unknown",
                model: "Unknown",
                year: "Unknown",
              };
            }
          })
        );

        setCars(carDetails);
      } catch (err) {
        console.error("Error fetching rentals:", err);
        setRentalError("An error occurred while fetching rentals.");
      }
    };

    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchCustomer(), fetchRentals()]);
      setLoading(false);
    };

    fetchData();
  }, [customerId, navigate]);

  const handleReturn = async (rentalId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/rentals/return/${rentalId}`,
        {
          method: "POST",
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to return the car.");
      }

      const result = await response.json();
      if (result.success) {
        setMessages((prevMessages) => ({
          ...prevMessages,
          [rentalId]: "Booking canceled!",
        }));
      } else {
        throw new Error(result.message || "Unknown error occurred.");
      }
    } catch (error) {
      console.error("Error returning the car:", error);
      setError(error.message || "Failed to return the car. Please try again.");
    }
  };

  if (loading)
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="container text-center mt-5">
        <div className="alert alert-danger">{error}</div>
      </div>
    );

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4 mb-5 bg-white rounded">
        <h1 className="text-center text-primary mb-4">
          Welcome, {customer?.name}
        </h1>
        <div className="row">
          <div className="col-md-6">
            <h3 className="text-secondary">Profile Details</h3>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <strong>Name:</strong> {customer?.name}
              </li>
              <li className="list-group-item">
                <strong>Address:</strong> {customer?.address}
              </li>
              <li className="list-group-item">
                <strong>Phone:</strong> {customer?.phone_number}
              </li>
              <li className="list-group-item">
                <strong>Email:</strong> {customer?.email}
              </li>
              <li className="list-group-item">
                <strong>Total Payment:</strong> $
                {customer?.total_payment?.toFixed(2)}
              </li>
              <Link to="/EditProfile"> Edit profile</Link>
            </ul>
          </div>
        </div>
      </div>

      <div className="card shadow-lg p-4 bg-light">
        <h3 className="text-secondary mb-4">Your Rentals</h3>
        {rentalError ? (
          <div className="alert alert-danger">{rentalError}</div>
        ) : rentals.length > 0 ? (
          rentals.filter((rental) => rental.returnedAt !== null).length > 0 ? (
            rentals
              .filter((rental) => rental.returnedAt !== null)
              .map((rental) => (
                <div key={rental._id} className="card mb-3">
                  <div className="card-body">
                    <h4 className="card-title text-primary">
                      Rental ID: {rental._id}
                    </h4>
                    <p className="card-text">
                      <strong>Car Make: </strong>{" "}
                      {cars[rental._id]?.make || "Unknown"}
                    </p>
                    <p className="card-text">
                      <strong>Car Model: </strong>{" "}
                      {cars[rental._id]?.model || "Unknown"}
                    </p>
                    <p className="card-text">
                      <strong>Manufacture Year:</strong>{" "}
                      {cars[rental._id]?.year || "Unknown"}
                    </p>
                    <p className="card-text">
                      <strong>Starting Date:</strong> {rental?.rentedAt || "0"}
                    </p>
                    <p className="card-text">
                      <strong>Ending Date:</strong> {rental?.returnedAt || "0"}
                    </p>
                    <button
                      className="btn btn-outline-primary"
                      onClick={() => handleReturn(rental._id)}
                    >
                      {messages[rental._id] || "Cancel Booking"}
                    </button>
                  </div>
                </div>
              ))
          ) : (
            <p className="text-secondary">No cars rented currently.</p>
          )
        ) : (
          <p className="text-secondary">No rentals found.</p>
        )}
      </div>
    </div>
  );
}

export default Profile;
