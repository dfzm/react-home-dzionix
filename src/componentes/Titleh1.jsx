import PropTypes from "prop-types";
import React from "react";

function Titleh1({ title, className = "" }) {
  return (
    <h1
      className={`
    ${className}`}
    >
      {title}
    </h1>
  );
}

Titleh1.propTypes = {
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default Titleh1;
