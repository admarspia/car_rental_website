import React from "react";
import CarList from "./CarList";
import Footer from "./Footer";
import { NavLink } from "react-router-dom";
import "../App.css";
import Header from "./Header";

function HomePage() {
  return (
    <div className="HomePage">
      <section className="Hero-section">
        <header className="home-header">
          <h1>Sophor Car Rental</h1>
          <nav>
            <ul className="nav nav-tabs">
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/"
                  end
                  style={{ color: "black" }} // Updated color
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/RegisterPage"
                  style={{ color: "black" }} // Updated color
                >
                  Register
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/Login"
                  style={{ color: "black" }} // Updated color
                >
                  Login/Logout
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/Profile"
                  style={{ color: "black" }} // Updated color
                >
                  Profile
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/ListCustomers"
                  style={{ color: "black" }} // Updated color
                >
                  ListCustomers
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/Search"
                  style={{ color: "black" }} // Updated color
                >
                  Search
                </NavLink>
              </li>
            </ul>
          </nav>
        </header>

        <p
          style={{
            margin: "0 0 0 950px",
            width: "30%",
            color: "whitesmoke",
          }}
        >
          choose the perfect car for your next adventure!
        </p>
        <div>
          <h1
            style={{
              margin: "250px 0 0 30px",
              color: "whitesmoke",
              width: "40%",
            }}
          >
            <b>Drive Your Dreams with Sophor Car Rentals.</b>
          </h1>
          <p
            style={{
              margin: "30px 0 30px 30px",
              color: "whitesmoke",
              width: "40%",
            }}
          >
            <em>Find the Perfect Car for Your Journey Today</em>
          </p>
          <p
            style={{
              margin: "30px 0 300px 30px",
              color: "whitesmoke",
              width: "40%",
            }}
          >
            "Whether you're planning a business trip, a family vacation, or
            simply need a reliable ride for daily use, our wide range of
            vehicles is tailored to meet your every need. From sleek sedans to
            spacious SUVs, we’ve got you covered!"
          </p>
        </div>
      </section>
      <section className="2nd-section">
        <h2
          style={{
            fontSize: "2rem",
            fontFamily: "fantasy",
            fontStyle: "italic",
            margin: "60px 0 30px 30px",
            fontWeight: "bolder",
          }}
        >
          Your Journey Starts Here
        </h2>
        <p className="text-muted mb-3" style={{ width: "60%", margin: "30px" }}>
          Booking your dream ride is just a few clicks away! Browse our fleet,
          choose your dates, and drive away with confidence. Experience
          convenience, reliability, and the freedom of exploring at your own
          pace with Sopor Rentals.
        </p>
      </section>
      <CarList />
    </div>
  );
}

export default HomePage;
