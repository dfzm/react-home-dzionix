import React from "react";
import "./Timeline.css";
import Tituloh2 from "../Tituloh2";
import {
  SvgBook,
  Wireframe,
  Code,
  OptimSeo,
  Revision,
  Lanzamiento,
} from "../Icono";

const ProcesoCreacion = () => {
  const procesoCreacion = [
    {
      id: "1",
      title: "Análisis y Estrategia ",
      description: "Estudiamos tu negocio y objetivos.",
      icon: <SvgBook />,
    },
    {
      id: "2",
      title: "Wireframes y UX/UI",
      description: "Definimos la estructura y el diseño.",
      icon: <Wireframe />,
    },
    {
      id: "3",

      title: "Desarrollo del sitio web ",
      description: "Construimos la web con las mejores prácticas.",
      icon: <Code />,
    },
    {
      id: "4",
      title: "Optimización SEO ",
      description: "Aplicamos estrategias para mejorar el posicionamiento.",
      icon: <OptimSeo />,
    },
    {
      id: "5",
      title: "Revisión y Ajustes",
      description: "Realizamos pruebas y optimizamos el rendimiento.",
      icon: <Revision />,
    },
    {
      id: "6",
      title: "Lanzamiento y Soporte",
      description: "Publicamos tu web y ofrecemos mantenimiento.",
      icon: <Lanzamiento />,
    },
  ];

  return (
    <section className="proceso-creacion">
      <Tituloh2 tittle="Proceso de creación" />
      <div className="timeline-container">
        {procesoCreacion.map((item) => (
          <div key={item.id} className="timeline-item">
            <div className="timeline-content">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
            <div className="timeline-icon">{item.icon}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProcesoCreacion;
