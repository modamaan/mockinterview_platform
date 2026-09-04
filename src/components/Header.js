```javascript
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Importing the CSS file for styling

// Header component
const Header = () => {
  return (
    <header className="header">
      {/* Logo Section */}
      <div className="logo">
        <img src="/path/to/new-logo.png" alt="Company Logo" className="logo-image" />
      </div>

      {/* Navigation Menu */}
      <nav className="navigation">
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/" className="nav-link">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="nav-link">About</Link>
          </li>
          <li className="nav-item">
            <Link to="/services" className="nav-link">Services</Link>
          </li>
          <li className="nav-item">
            <Link to="/contact" className="nav-link">Contact</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
```

```css
/* Header.css */

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #f8f9fa;
  border-bottom: 1px solid #e0e0e0;
}

.logo {
  display: flex;
  align-items: center;
}

.logo-image {
  height: 50px;
  width: auto;
}

.navigation {
  display: flex;
}

.nav-list {
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
}

.nav-item {
  margin-left: 20px;
}

.nav-link {
  text-decoration: none;
  color: #333;
  font-weight: 500;
  transition: color 0.3s;
}

.nav-link:hover {
  color: #007bff;
}
```