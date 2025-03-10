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
            {" "}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit
            cupiditate soluta natus assumenda facere, corporis molestiae itaque
            voluptatibus totam necessitatibus omnis similique, facilis nostrum
            culpa nobis? Quis alias explicabo aut?{" "}
          </p>
          <Boton name="+ INFO" />
        </div>
        <div className="complementarios">
          <h3> Optimización SEO </h3>
          <p>
            {" "}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit
            cupiditate soluta natus assumenda facere, corporis molestiae itaque
            voluptatibus totam necessitatibus omnis similique, facilis nostrum
            culpa nobis? Quis alias explicabo aut?
          </p>
          <Boton name="+ INFO" />
        </div>
      </section>
    </section>
  );
};

export default ServiciosComplementarios;
