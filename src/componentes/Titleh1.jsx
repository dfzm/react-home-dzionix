import PropTypes from "prop-types";
import React from "react";

function Titleh1({ tittle, className = "" }) {
  return (
    <h1
      className={`
    ${className}`}
    >
      {tittle}
    </h1>
  );
}

Titleh1.propTypes = {
  tittle: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default Titleh1;
