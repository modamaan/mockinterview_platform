```javascript
import React from 'react';
import './HomePage.css'; // Importing the CSS file for styling

const HomePage = () => {
  return (
    <div className="homepage">
      <header className="homepage-header">
        <h1>Welcome to Our Website</h1>
        <p>Your one-stop solution for all your needs</p>
      </header>

      <main className="homepage-main">
        <section className="intro-section">
          <h2>About Us</h2>
          <p>
            We are dedicated to providing the best service to our customers. Our team is
            committed to excellence and innovation.
          </p>
        </section>

        <section className="services-section">
          <h2>Our Services</h2>
          <div className="services-list">
            <div className="service-item">
              <h3>Consulting</h3>
              <p>Expert advice to help you grow your business.</p>
            </div>
            <div className="service-item">
              <h3>Development</h3>
              <p>Custom software solutions tailored to your needs.</p>
            </div>
            <div className="service-item">
              <h3>Support</h3>
              <p>24/7 support to ensure your operations run smoothly.</p>
            </div>
          </div>
        </section>

        <section className="contact-section">
          <h2>Contact Us</h2>
          <p>
            Have questions? Reach out to us at <a href="mailto:info@ourwebsite.com">info@ourwebsite.com</a>
          </p>
        </section>
      </main>

      <footer className="homepage-footer">
        <p>&copy; 2023 Our Website. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
```
