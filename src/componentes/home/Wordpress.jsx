import React from "react";
import Tituloh2 from "../Tituloh2";
import { Edit, Seo, Seguridad } from "../Icono";
import Boton from "../Boton";
import BotonLight from "../BotonLight";

const Wordpress = () => {
  return (
    <>
      <section className="h-wordpress">
        <section className="column col-1">
          <Tituloh2 tittle="Desarrollo web en WordPress" />
          <p>
            WordPress es la plataforma ideal para crear sitios web
            personalizables y fáciles de administrar. Con nuestra experiencia,
            obtendrás una web atractiva, segura y optimizada para SEO
          </p>
          <ul className="iconos">
            <li className="caja-icon">
              <Edit />
              <span>
                Facilidad para editar y actualizar tu contenido en tiempo real.
              </span>
            </li>
            <li className="caja-icon">
              <Seo />
              <span>
                Integración con herramientas SEO para mejorar tu
                posicionamiento.
              </span>
            </li>
            <li className="caja-icon">
              <Seguridad />
              <span>
                Actualizaciones y seguridad constantes que mejoran el
                rendimiento.
              </span>
            </li>
          </ul>
          <div className="botones">
            <Boton name="Pedir Presupuesto" />
            <BotonLight name="Más información" />
          </div>
        </section>
        <section className="column col-2">
          <img src="https://dzionix.com/wp-content/uploads/2025/02/desarrollo-en-wordpress.svg" />
        </section>
      </section>
    </>
  );
};

export default Wordpress;
