import React from "react";
import PropTypes from "prop-types";

const Descripcioncaja = ({ descripcion }) => {
  return (
    <>
      <p> {descripcion} </p>
    </>
  );
};

Descripcioncaja.propTypes = {
  descripcion: PropTypes.string.isRequired,
};

export default Descripcioncaja;
