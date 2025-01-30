import React from "react";

function ListCustomers() {
  return (
    <footer
      style={{
        backgroundColor: "rgb(248, 248, 248)",
        padding: "20px",
        marginTop: "20px",
      }}
    >
      <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
        <div className="me-5 d-none d-lg-block">
          <span>Get connected with us on social networks:</span>
        </div>
        <div>
          <a
            href="https://facebook.com"
            className="me-4 text-reset"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-facebook-f"></i>
          </a>
          <a
            href="https://twitter.com"
            className="me-4 text-reset"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-twitter"></i>
          </a>
          <a
            href="https://instagram.com"
            className="me-4 text-reset"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-instagram"></i>
          </a>
          <a
            href="https://linkedin.com"
            className="me-4 text-reset"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-linkedin"></i>
          </a>
        </div>
      </section>

      <section>
        <div className="container text-center text-md-start mt-5">
          <div className="row mt-3">
            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Sophor Car Rental</h6>
              <p>
                Your trusted partner for convenient and affordable car rentals.
                Serving customers worldwide with exceptional service and quality
                vehicles.
              </p>
            </div>

            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Our Services</h6>
              <p>
                <a href="#!" className="text-reset">
                  Car Rentals
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Corporate Plans
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Long-Term Rentals
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Luxury Cars
                </a>
              </p>
            </div>

            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Useful Links</h6>
              <p>
                <a href="#!" className="text-reset">
                  Pricing
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  FAQs
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Support
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Terms & Conditions
                </a>
              </p>
            </div>

            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
              <p>
                <i className="fas fa-home me-3"></i> Addis Ababa, Ethiopia
              </p>
              <p>
                <i className="fas fa-envelope me-3"></i> sophor@gmail.com
              </p>
              <p>
                <i className="fas fa-phone me-3"></i> +251 912 345 678
              </p>
            </div>
          </div>
        </div>
      </section>

      <div
        className="text-center p-4"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
      >
        © 2025 Sophor Car Rental. All Rights Reserved.
      </div>
    </footer>
  );
}

export default ListCustomers;
