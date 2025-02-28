import React from "react";
import { Rapidez, Usable, SeguridadWeb, GestionContenido } from "../Icono";
import Tituloh2 from "../Tituloh2";

const Beneficios = () => {
  const iconBeneficios = [
    {
      id: 1,
      icono: <Rapidez />,
      title: "Eficiencia y Rapidez",
      descripcion:
        "Creamos sitios web optimizados para que carguen rápido, funcionen  sin errores y brinden la mejor experiencia a los visitantes.",
    },
    {
      id: 2,
      icono: <Usable />,
      title: "Experiencia de Usuario (UX)",
      descripcion:
        "Diseñamos con un enfoque UX para que tus visitantes encuentren lo que buscan de forma intuitiva y sin esfuerzo.",
    },
    {
      id: 3,
      icono: <SeguridadWeb color="currentColor" />,
      title: "Fiabilidad y Seguridad",
      descripcion:
        "Implementamos protocolos de seguridad para evitar vulnerabilidades y garantizar la estabilidad de tu web.",
    },
    {
      id: 4,
      icono: <GestionContenido color="currentColor" />,
      title: "Autogestión Sencilla",
      descripcion:
        "Si lo deseas, podrás gestionar tu propio contenido sin depender de terceros, con una interfaz intuitiva fácil de usar.",
    },
  ];

  return (
    <section className="beneficios-home">
      <Tituloh2 tittle="Benficios" />

      <section className="beneficios">
        {iconBeneficios.map((item) => (
          <div key={item.id} className="caja-beneficio">
            <figure>{item.icono}</figure>
            <h3> {item.title} </h3>
            <p className="texto-beneficio">{item.descripcion}</p>
          </div>
        ))}
      </section>
    </section>
  );
};
export default Beneficios;
