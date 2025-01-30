import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";


function CarCard({ car }) {
  return (
    <Link
      to={`/cars/${car._id}`}
      style={{
        textDecoration: "none",
        color: "inherit",
      }}
    >
      <Card
        className="car-card shadow-lg"
        style={{
          width: "24rem",
          height: "27rem",
          borderRadius: "12px",
          overflow: "hidden",
          cursor: "pointer",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >

        <Card.Img
          variant="top"
          src={car.imageUrl}
          alt={`${car.model}`}
          style={{
            height: "60%",
            
            objectFit: "cover",
          }}
        />

        <Card.Body
          style={{
            padding: "1rem",
            backgroundColor: "#f9f9f9",
          }}
        >
          <Card.Title
            style={{
              fontSize: "1.5rem",
              fontWeight: "600",
              marginBottom: "0.5rem",
            }}
          >
            {car.model} <sup>&#174;</sup>
          </Card.Title>
          <Card.Text
            className="text-muted"
            style={{
              fontSize: "0.9rem",
              lineHeight: "1.5",
            }}
          >
            {car.text}
          </Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
}

export default CarCard;
