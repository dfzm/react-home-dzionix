import React from "react";
import Tituloh2 from "../Tituloh2";
import Boton from "../Boton";

const ServiciosComplementarios = () => {
  return (
    <section
      className="servicios-complementarios"
      id="servicios-complementarios"
    >
      <div className="contenedor-h2">
        <Tituloh2 tittle="Servicios Complementarios" />
      </div>
      <section className="contenedor-complementarios">
        <div className="complementarios">
          <h3> Diseño UX/UI </h3>
          <p>
            Transformamos la forma en que tus clientes interactúan con tu sitio
            web. Nuestro enfoque en UX/UI combina estética y funcionalidad para
            ofrecer una navegación fluida y atractiva, mejorando la retención y
            conversión.
          </p>
          <Boton name="+ INFO" />
        </div>
        <div className="complementarios">
          <h3> Optimización SEO </h3>
          <p>
            Potenciamos la visibilidad online de tu negocio mediante estrategias
            SEO efectivas. Implementamos mejoras técnicas y optimizamos el
            contenido para incrementar el tráfico orgánico y fortalecer tu
            presencia digital de manera sostenible.
          </p>
          <Boton name="+ INFO" />
        </div>
      </section>
    </section>
  );
};

export default ServiciosComplementarios;
