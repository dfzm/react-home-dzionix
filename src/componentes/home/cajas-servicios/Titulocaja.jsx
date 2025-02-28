import React from "react";
import PropTypes from "prop-types";

const Titulocaja = ({ title }) => {
  return (
    <>
      <h3 className="titulo-caja"> {title} </h3>
    </>
  );
};

Titulocaja.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Titulocaja;
