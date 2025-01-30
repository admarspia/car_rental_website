# Sophor Car Rental

## Overview

Sophor Car Rental is an online platform for renting cars. This web application allows users to search for available cars, view detailed information about each car, and manage their bookings. The system includes user authentication, responsive design, and a backend for handling the car data and booking system.

Built using **React**, **Node.js**, and **MongoDB**, Sophor Car Rental is designed to be intuitive and responsive on both mobile and desktop devices.

---

## Features

- **User Authentication**: Users can sign up, log in, and manage their profiles.
- **Car Search**: Users can search cars by multiple criteria such as make, model, and year.
- **Car Details**: Each car has a detailed page with images, specifications, and availability.
- **Responsive Design**: Optimized for both desktop and mobile users.
- **Booking System**: Users can select rental dates and book available cars.
- **Admin Panel**: Admins can manage car listings and user data.

---

## Tech Stack

- **Frontend**: React.js, React Router, Tailwind CSS (or custom CSS)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Deployment**: Heroku (for backend), Netlify (for frontend)

---

## Installation

### Prerequisites

- Node.js and npm (Node package manager)
- MongoDB account (for database connection)

### Clone the Repository

To get started, clone the repository to your local machine:

```bash
git clone https://github.com/your-username/sophor-car-rental_website.git
cd sophor-car-rental

Set up the Backend

    Navigate to the backend directory:

cd backend

    Install dependencies:

npm install

    Set up environment variables for MongoDB and JWT in a .env file:

MONGO_URI=mongodb://<your-mongo-uri>
JWT_SECRET=<your-jwt-secret>

    Start the backend server:

npm start

The backend will run on http://localhost:5000.
Set up the Frontend

    Navigate to the frontend directory:

cd ../frontend

    Install dependencies:

npm install

    Start the frontend development server:

npm start

The frontend will run on http://localhost:3000.
Usage

    Sign Up / Login: Create an account or log in to access the full features of the car rental system.
    Search for Cars: Use the search bar to filter cars by criteria such as make, model, year, etc.
    View Car Details: Click on any car to view more detailed information, including availability and specifications.
    Book a Car: Select your rental dates and proceed to book a car.
    Admin Features: Admins can manage car listings and users directly from the admin panel.
```
Deployment

The application is deployed using Heroku for the backend and Netlify for the frontend. You can view the live demo here:

    Frontend (Netlify)
    Backend (Heroku)

Contributing

We welcome contributions to this project! If you find a bug or want to add a feature, please follow these steps:

    Fork the repository.
    Create a new branch (git checkout -b feature-name).
    Make your changes and commit (git commit -am 'Add new feature').
    Push to the branch (git push origin feature-name).
    Open a pull request to the main repository.

License

This project is licensed under the MIT License - see the LICENSE file for details.
Acknowledgments

    Thanks to React, Node.js, and MongoDB for providing powerful tools to build modern web applications.
    Inspiration for the design from various car rental platforms.

Contact

For any questions or inquiries, feel free to reach out via GitHub issues or email: 1admarspis@gmail.com





