import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./components/Homepage";
import RegisterPage from "./components/RegisterPage";
import Profile from "./components/Profile";
import Header from "./components/Header";
import EditProfile from "./components/EditProfile";
import Login from "./components/Login";
import ListCustomers from "./components/ListCustomers";
import CarDetails from "./components/Rent";
import Footer from "./components/Footer";
import Search from "./components/Search";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";



function App() {
  const location = useLocation(); // useLocation is now safe to use here

  return (
    <div>
      {/* Conditionally render the Header only if the current path is not "/" */}
      {location.pathname !== "/" && <Header />}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/RegisterPage" element={<RegisterPage />} />
        <Route path="/EditProfile" element={<EditProfile />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/cars/:id" element={<CarDetails />} />
        <Route path="/ListCustomers" element={<ListCustomers />} />
        <Route path="/Search" element={<Search />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
