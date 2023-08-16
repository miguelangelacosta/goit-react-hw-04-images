import React from 'react';
import PropTypes from 'prop-types';
import './Button.css'
const Button = ({ onClick }) => {
  return (
    <button type="button" className="button" onClick={onClick}>
      Cargar más
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Button;
