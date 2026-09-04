```javascript
import React from 'react';
import PropTypes from 'prop-types';
import './Button.css'; // Import the CSS file for styling

const Button = ({ label, onClick, type = 'button', disabled = false }) => {
  return (
    <button
      className={`custom-button ${disabled ? 'disabled' : ''}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

Button.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  disabled: PropTypes.bool,
};

export default Button;
```

```css
/* Button.css */

.custom-button {
  background-color: #4CAF50; /* Primary color */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.custom-button:hover {
  background-color: #45a049; /* Darker shade for hover effect */
}

.custom-button:active {
  background-color: #3e8e41; /* Even darker shade for active state */
}

.custom-button.disabled {
  background-color: #cccccc; /* Disabled color */
  cursor: not-allowed;
}
```

This code defines a `Button` component in React with updated styles according to new design guidelines. The styles are defined in a separate CSS file `Button.css`, which is imported into the component. The button has different styles for normal, hover, active, and disabled states.