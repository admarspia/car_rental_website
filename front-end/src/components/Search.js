import React, { useState } from "react";
import CarCard from "./CarCard";
import "../App.css"; // Assuming you have a global CSS file

function Search() {
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState("");
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setQuery(e.target.value.trim());
  };

  // Handle Enter key press to trigger search
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission refresh
      handleSearch();
    }
  };

  // Function to fetch search results
  const handleSearch = () => {
    if (!query) {
      setCars([]);
      setMessage("Please enter a search query.");
      return;
    }

    const queryObject = {};
    query.split(" ").forEach((keyword) => {
      if (keyword.includes(":")) {
        const [key, value] = keyword.split(":");
        if (key.trim() && value.trim()) {
          queryObject[key.trim()] = value.trim();
        }
      }
    });

    const queryString = new URLSearchParams(queryObject).toString();

    setLoading(true);
    fetch(`http://localhost:5000/cars/search?${queryString}`)
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        if (data.success) {
          setCars(data.data);
          setMessage("");
        } else {
          setCars([]);
          setMessage("No cars match this criteria.");
        }
      })
      .catch((err) => {
        setLoading(false);
        setMessage("Error fetching cars. Please try again later.");
        console.error("Fetch error:", err);
      });
  };

  return (
    <div className="search-container">
      {/* Search Input - Right Aligned */}
      <div className="search-input-container">
        <input
          id="query"
          className="search-input"
          placeholder="e.g. make:Ford model:Mustang year:2021"
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown} // ✅ Triggers search only when Enter is pressed
        />
      </div>

      {/* Results Section with Left Margin */}
      <div className="results-container">
        {loading ? (
          <p className="loading-text">Loading...</p>
        ) : message ? (
          <p className="message-text">{message}</p>
        ) : (
          <div className="car-list">
            {cars.length > 0 ? (
              cars.map((car) => <CarCard key={car._id} car={car} />)
            ) : (
              <p className="no-cars-text">No cars found</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
