import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

function Login() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state
  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Check login state on component mount
  useEffect(() => {
    const customerId = localStorage.getItem("customerId");
    if (customerId) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/customers/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("customerId", data.customerId);
        setMessage("Login successful!");
        setIsLoggedIn(true);
        setFormData({
          name: "",
          password: "",
        });
        navigate("/"); // Navigate to home or dashboard
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || "Login failed. Please try again.");
      }
    } catch (err) {
      console.error("Error logging in:", err);
      setMessage("An error occurred. Please try again later.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("customerId");
    setIsLoggedIn(false);
    setMessage("You have successfully logged out.");
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="login-page d-flex align-items-center justify-content-center vh-100">
      <div className="card shadow-lg" style={{ width: "400px" }}>
        <div className="card-body">
          <h3 className="card-title text-center mb-4">
            {isLoggedIn ? "Welcome Back!" : "Login"}
          </h3>
          {!isLoggedIn ? (
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  User Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="form-control"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="form-control"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Login
              </button>
            </form>
          ) : (
            <button className="btn btn-danger w-100" onClick={handleLogout}>
              Logout
            </button>
          )}
          {message && (
            <div
              className={`alert mt-3 ${
                message.includes("successful")
                  ? "alert-success"
                  : "alert-danger"
              }`}
              role="alert"
            >
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
