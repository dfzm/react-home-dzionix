import React from "react";
import Titleh1 from "./componentes/Titleh1";
import Boton from "./componentes/Boton";

function BannerHome() {
  return (
    <>
      <section className="bannerPrincipal">
        <div className="column1">
          <Titleh1 title="Desarrollo de Paginas Web" />
          <p>
            Ofrecemos soluciones completas de desarrollo web para emprendedores,
            pequeñas y medianas empresas, desde tiendas online hasta sitios
            corporativos y catálogos digitales.
          </p>
          <Boton name="Ver servicios" enlace="#servicios" />
        </div>
        <div className="column2">
          <img
            src="https://dzionix.com/wp-content/uploads/2025/02/Desarrollo-de-paginas-web-ordenador.png"
            alt="Ordenador con la palabra DZIONIX"
            title="Ordenador con la palabra DZIONIX"
          />
        </div>
      </section>
    </>
  );
}

export default BannerHome;
