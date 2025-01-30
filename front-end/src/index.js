import React from "react";
import ReactDOM from "react-dom/client"; // Importing from 'react-dom/client' in React 18+
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router } from "react-router-dom";

// Create a root for React 18 and render the app
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    {" "}
    {/* Wrap the entire app with Router */}
    <App />
  </Router>
);
