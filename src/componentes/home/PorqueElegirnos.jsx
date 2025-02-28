import React from "react";
import Tituloh2 from "../Tituloh2";
import Boton from "../Boton";
import Icono, { Check } from "../Icono";

const PorqueElegirnos = () => {
  const iconElegirnos = [
    {
      id: 1,
      title: "Experiencia y Profesionalismo",
      descripcion: "Expertos en diseño, desarrollo y estrategias SEO.",
    },
    {
      id: 2,

      title: "Comunicación Directa y Asertiva",
      descripcion: "Asesoría personalizada en cada etapa del proyecto.",
    },
    {
      id: 3,

      title: "Innovación Continua",
      descripcion:
        "Actualizamos y renovamos tu web para mantenerla competitiva.",
    },
    {
      id: 4,

      title: "Soporte Integral",
      descripcion:
        "Mantenimiento y asistencia técnica para asegurar el rendimiento óptimo de tu sitio.",
    },
  ];
  return (
    <>
      <section className="porque-elegirnos">
        <section className="column col-1">
          <img
            src="https://dzionix.com/wp-content/uploads/2025/02/por-que-elegirnos-desarrollo-web.svg"
            alt=""
          />
        </section>
        <section className="column col-2">
          <Tituloh2 tittle="¿Por qué Elegirnos?" />
          <p>
            Con un enfoque integral en desarrollo web, SEO técnico y diseño
            UX/UI, ayudamos a tu negocio a destacar en el competitivo entorno
            digital. Nuestro compromiso es ofrecerte soluciones innovadoras y
            resultados medibles.
          </p>
          <ul>
            {iconElegirnos.map((item) => (
              <li key={item.id} className="item-elegirnos">
                <Icono Icon={Check} />
                <div className="item-elegirnos-text">
                  <h3>{item.title}</h3>
                  <p>{item.descripcion}</p>
                </div>
              </li>
            ))}
          </ul>
          <Boton name="Contáctanos" enlace="#" />
        </section>
      </section>
    </>
  );
};

export default PorqueElegirnos;
