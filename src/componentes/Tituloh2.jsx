import React from "react";
import PropTypes from "prop-types";

const Tituloh2 = ({ tittle }) => {
  return (
    <>
      <h2 className="tituloh2"> {tittle} </h2>
    </>
  );
};

Tituloh2.propTypes = {
  tittle: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default Tituloh2;
