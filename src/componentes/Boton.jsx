import React from "react";
import PropTypes from "prop-types";

const Boton = ({ name, enlace }) => {
  return (
    <button className="btn-principal">
      <a href={enlace}>
        {name}
      </a>
    </button>
  );
};

Boton.propTypes = {
  name: PropTypes.string.isRequired,
  enlace: PropTypes.string.isRequired,
};

// Estilos para el botón (puedes usar CSS o una librería como Tailwind si prefieres)

export default Boton;
