import React from "react";
import Tituloh2 from "../Tituloh2";
import CajaServicioHome from "../CajaServicioHome";
import BotonLight from "../BotonLight";
import "./Home.css";
import { Programacion, Ecommerce, Rediseño, Soporte } from "../Icono";

const Servicios = () => {
  const Datos = [
    {
      id: 1,
      Icon: Programacion,
      title: "Desarrollo web",
      descripcion:
        "Desarrollamos sitios web optimizados para SEO y con diseños responsivos.",
      nameBoton: "Ver más",
      enlaceBoton: "https://dzionix.com/desarrollo-paginas-web/",
    },
    {
      id: 2,
      Icon: Ecommerce,
      title: "Ecommerce",
      descripcion:
        "Desarrollamos tiendas online y catálogos digitales que impulsan las ventas.",
      nameBoton: "Ver más",
      enlaceBoton:
        "https://dzionix.com/desarrollo-de-tiendas-online-y-catalogo-virtuales/",
    },
    {
      id: 3,
      Icon: Rediseño,
      title: "Rediseño Web",
      descripcion:
        "Rediseñamos sitios web con enfoque en usabilidad, rendimiento y SEO.",
      nameBoton: "Ver más",
      enlaceBoton:
        "https://dzionix.com/rediseno-web-profesional-potencia-tu-sitio-con-un-diseno-moderno-y-agil/",
    },
    {
      id: 4,
      Icon: Soporte,
      title: "Soporte Técnico",
      descripcion:
        "Actualizaciones y soporte para mantener tu sitio web en su mejor forma.",
      nameBoton: "Ver más",
      enlaceBoton: "https://dzionix.com/desarrollo-de-paginas-web/",
    },
  ];

  return (
    <section className="comp-servicios" id="servicios">
      <Tituloh2 tittle="Nuestros Servicios" />
      <section className="servicios-home">
        {Datos.map((item) => (
          <CajaServicioHome
            key={item.id}
            Icon={item.Icon}
            title={item.title}
            descripcion={item.descripcion}
            name={item.nameBoton}
            enlace={item.enlaceBoton}
          />
        ))}
      </section>
      <BotonLight
        name="Ver Servicios Complementarios"
        enlace="#servicios-complementarios"
      />
    </section>
  );
};

export default Servicios;
