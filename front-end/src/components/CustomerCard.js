import React from "react";
import { Card } from "react-bootstrap";

function CustomerCard({ customer }) {
  return (
    <Card className="customer-card shadow-lg p-3 mb-4 bg-white rounded">
      <Card.Body>
        <Card.Title className="text-primary">{customer.name}</Card.Title>
        <Card.Text>
          <strong>Address:</strong> {customer.address}
        </Card.Text>
        <Card.Text>
          <strong>Phone:</strong> {customer.phone_number}
        </Card.Text>
        <Card.Text>
          <strong>Email:</strong> {customer.email}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default CustomerCard;
