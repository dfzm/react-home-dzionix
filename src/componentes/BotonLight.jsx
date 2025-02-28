import React from "react";
import PropTypes from "prop-types";

const BotonLight = ({ name, enlace }) => {
  return (
    <button className="btn-light">
      <a href={enlace} target="new">
        {name}
      </a>
    </button>
  );
};

BotonLight.propTypes = {
  enlace: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

// Estilos para el botón (puedes usar CSS o una librería como Tailwind si prefieres)

export default BotonLight;
