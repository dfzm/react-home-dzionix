import React from "react";
import { proyectos } from "./Proyectos";
import { ArrowRight } from "../Icono";

const ClientePortafolioHome = () => {
  return (
    <>
      {proyectos.slice(0, 3).map((item) => (
        <article key={item.id} className="project-card">
          <div className="project-image-container">
            <img src={item.image} alt={item.alt} className="project-image" />
          </div>
          <div className="project-content">
            <h3 className="project-title"> {item.title}</h3>
            <p className="project-description">{item.descripcion}</p>
            <ArrowRight />
          </div>
        </article>
      ))}
    </>
  );
};

export default ClientePortafolioHome;
