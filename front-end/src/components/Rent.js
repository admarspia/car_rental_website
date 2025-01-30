import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Card, Container } from "react-bootstrap";
import "../App.css";

function CarDetails() {
  const customerId = localStorage.getItem("customerId");
  const { id } = useParams();
  const [booking, setBooking] = useState([]);
  const [car, setCar] = useState(null);
  const [error, setError] = useState("");
  const [formData, setFromData] = useState({
    dateStart: "",
    dateEnd: "",
    customerId: `${customerId}`,
  });
  const [notification, setNotification] = useState("");
  const navigate = useNavigate();

  // Fetch car details
  useEffect(() => {
    fetch(`http://localhost:5000/cars/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch car details.");
        }
        return response.json();
      })
      .then((data) => setCar(data))
      .catch((err) => setError(err.message));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFromData({ ...formData, [name]: value });
  };

  const getRentals = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/rentals/cars/search?carId=${car._id}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch rentals");
      }
      const result = await response.json();

      if (result.success && Array.isArray(result.data)) {
        setBooking(result.data);
      } else {
        throw new Error("Invalid server response format");
      }
    } catch (err) {
      console.error("Error fetching rentals:", err);
      setBooking([]);
    }
  };

  const isCarAvailable = async (dateStart, dateEnd) => {
    // Only check availability if there is exactly one car
    if (car.num_of_cars !== 1) {
      return false;
    }

    const start = new Date(dateStart);
    const end = new Date(dateEnd);

    // Check for overlapping bookings
    return !booking.some((rental) => {
      const rentalStart = new Date(rental.rentedAt);
      const rentalEnd = rental.returnedAt ? new Date(rental.returnedAt) : null;

      return (
        (start >= rentalStart && (!rentalEnd || start <= rentalEnd)) || // Overlaps with start
        (end >= rentalStart && (!rentalEnd || end <= rentalEnd)) || // Overlaps with end
        (start <= rentalStart && end >= rentalEnd) // Completely overlaps
      );
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!customerId) {
      setNotification("You need to login first.");
      navigate("/Login");
      return;
    }

    // Fetch rentals and check availability
    await getRentals();
    const available = await isCarAvailable(
      formData.dateStart,
      formData.dateEnd
    );

    if (car.num_of_cars > 1 || available) {
      try {
        const response = await fetch(
          `http://localhost:5000/rentals/rent/${id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );

        if (response.ok) {
          setNotification("Booking successful!");
          setCar({ ...car, is_available: false });
          setFromData({
            dateStart: "",
            dateEnd: "",
            customerId: `${customerId}`,
          });
        } else {
          const error = await response.json();
          setNotification(`Failed to book: ${error.message}`);
        }
      } catch (err) {
        console.error("Server error:", err);
        setNotification("An error occurred. Please try again.");
      }
    } else {
      setNotification("Car is not available for the selected dates.");
    }
  };

  if (error) return <p>{error}</p>;
  if (!car) return <p>Loading car details...</p>;

  return (
    <Container>
      <h2 className="text-center my-4">Book Your Dream Ride Today!</h2>
      <p className="text-muted text-center mb-5">
        Select your preferred dates below and ensure the car is available for
        your trip.
      </p>
      <div className="d-flex justify-content-between align-items-start gap-4">
        <Card className="flex-grow-1 shadow-lg" style={{ maxWidth: "500px" }}>
          <Card.Img variant="top" src={car.imageUrl} alt="Car" />
          <Card.Body>
            <Card.Title>
              {car.make} {car.model}
            </Card.Title>
            <Card.Text>Year: {car.year}</Card.Text>
            <Card.Text>
              <strong>Status:</strong>{" "}
              {car.is_available ? "Available" : "Not Available"}
            </Card.Text>
          </Card.Body>
        </Card>
        <div className="flex-grow-1 p-4 bg-light shadow rounded">
          <h5>Booking Form</h5>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="dateStart" className="form-label">
                Start Date
              </label>
              <input
                type="date"
                id="dateStart"
                name="dateStart"
                className="form-control"
                value={formData.dateStart}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="dateEnd" className="form-label">
                End Date
              </label>
              <input
                type="date"
                id="dateEnd"
                name="dateEnd"
                className="form-control"
                value={formData.dateEnd}
                onChange={handleChange}
                required
              />
            </div>
            <Button variant="primary" type="submit">
              Book Your Rental
            </Button>
          </form>
          {notification && <p className="text-info mt-3">{notification}</p>}
        </div>
      </div>
    </Container>
  );
}

export default CarDetails;
