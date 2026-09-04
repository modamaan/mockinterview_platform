```javascript
import React from 'react';
import './Footer.css'; // Assuming there is a CSS file for styling

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-links">
          <a href="/about" className="footer-link">About Us</a>
          <a href="/contact" className="footer-link">Contact</a>
          <a href="/privacy" className="footer-link">Privacy Policy</a>
          <a href="/terms" className="footer-link">Terms of Service</a>
        </div>
        <div className="footer-social-media">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">
            <img src="/icons/facebook.svg" alt="Facebook" />
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">
            <img src="/icons/twitter.svg" alt="Twitter" />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">
            <img src="/icons/instagram.svg" alt="Instagram" />
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon">
            <img src="/icons/linkedin.svg" alt="LinkedIn" />
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
```

```css
/* Assuming this is the content of Footer.css */

.footer {
  background-color: #333;
  color: #fff;
  padding: 20px 0;
  text-align: center;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.footer-links {
  display: flex;
  gap: 15px;
}

.footer-link {
  color: #fff;
  text-decoration: none;
  transition: color 0.3s;
}

.footer-link:hover {
  color: #ddd;
}

.footer-social-media {
  display: flex;
  gap: 10px;
}

.social-icon img {
  width: 24px;
  height: 24px;
  transition: transform 0.3s;
}

.social-icon:hover img {
  transform: scale(1.1);
}

.footer-bottom {
  margin-top: 20px;
  font-size: 14px;
}
```