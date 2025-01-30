import React, { useState, useEffect } from "react";
import CustomerCard from "./CustomerCard"; // Assuming you have a CustomerCard component

function ListCustomers() {
  const [customers, setCustomers] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch("http://localhost:5000/customers");
        if (response.ok) {
          const data = await response.json();
          setCustomers(data);
        } else {
          setMessage("Failed to fetch customers. Please try again later.");
        }
      } catch (err) {
        console.error("Error fetching customers:", err);
        setMessage("An error occurred while fetching customer data.");
      }
    };

    fetchCustomers();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-center text-primary mb-4">Customer List</h2>
      {message && <div className="alert alert-danger">{message}</div>}
      <div className="row">
        {customers.map((customer) => (
          <div className="col-md-4 mb-4" key={customer._id}>
            <CustomerCard customer={customer} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListCustomers;
