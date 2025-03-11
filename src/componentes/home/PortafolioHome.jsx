import React from "react";
import ClientePortafolioHome from "./ClientePortafolioHome";
import "./Home.css";
import Tituloh2 from "../Tituloh2";
import Boton from "../Boton";

const PortafolioHome = () => {
  return (
    <section className="proyectos-home">
      <Tituloh2 tittle="Proyectos Destacados" />
      <section className="projects-grid">
        <ClientePortafolioHome />
      </section>
      <Boton
        name="Ver más Proyectos"
        enlace="/portafolio/"
      />
    </section>
  );
};

export default PortafolioHome;
