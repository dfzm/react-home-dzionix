import React from "react";
import Boton from "./Boton";
import Titulocaja from "./home/cajas-servicios/Titulocaja";
import Descripcioncaja from "./home/cajas-servicios/Descripcioncaja";
import PropTypes from "prop-types";
import Icono from "./Icono";

const CajaServicioHome = ({ title, descripcion, name, enlace, Icon, size }) => {
  return (
    <>
      <section className="caja-servicio">
        {Icon && <Icono Icon={Icon} size={size} />}
        <Titulocaja title={title} />
        <Descripcioncaja descripcion={descripcion} />
        <Boton name={name} enlace={enlace} />
      </section>
    </>
  );
};

CajaServicioHome.propTypes = {
  title: PropTypes.string.isRequired,
  descripcion: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  enlace: PropTypes.string.isRequired,
  Icon: PropTypes.elementType,
  size: PropTypes.number,
};

export default CajaServicioHome;
