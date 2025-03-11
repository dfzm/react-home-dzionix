import React, { useEffect, useState } from "react";
import PortafolioHome from "../componentes/home/PortafolioHome";
import Tituloh2 from "../componentes/Tituloh2";
import Boton from "../componentes/Boton";
import { proyectos } from "../componentes/home/Proyectos";
import "../componentes/home/Home.css";
import "./Portafolio.css";

const Portafolio = () => {
  const [proyectosDestacados, setProyectosDestacados] = useState([]);
 
  const [categoriaActiva, setCategoriaActiva] = useState("todos");

  const categorias = [
    { id: "todos", nombre: "Todos" },
    { id: "tiendas", nombre: "Tiendas Online" },
    { id: "catalogos", nombre: "Catálogos" },
    { id: "corporativos", nombre: "Corporativos" },
    { id: "landing", nombre: "Landing Pages" }
  ];

  // Asignar categorías a los proyectos existentes
  const proyectosConCategoria = proyectos.map(proyecto => ({
    ...proyecto,
  }));

  useEffect(() => {
    // Inicializar los proyectos destacados con los originales
    const proyectosFiltrados = proyectosConCategoria.filter(proyecto => 
      categoriaActiva === "todos" || proyecto.categoria === categoriaActiva
    );
    setProyectosDestacados(proyectosFiltrados);
  }, [categoriaActiva]);

  // Filtrar proyectos por categoría
  const filtrarPorCategoria = (categoria) => {
    setCategoriaActiva(categoria);
  };

  return (
    <div className="pagina-portafolio">
      <div className="portafolio-encabezado">
        <h1>Nuestro Portafolio</h1>
        <p>Descubre algunos de nuestros trabajos más destacados en diseño y desarrollo web</p>
      </div>
      
      <div className="filtros-categorias">
        {categorias.map(categoria => (
          <button 
            key={categoria.id} 
            onClick={() => filtrarPorCategoria(categoria.id)}
            className={categoriaActiva === categoria.id ? 'activo' : ''}
          >
            {categoria.nombre}
          </button>
        ))}
      </div>
      
      <section className="proyectos-destacados">
        <Tituloh2 tittle="Proyectos Destacados" />
        <div className="proyectos-grid">
          {proyectosDestacados.length > 0 ? (
            proyectosDestacados.map((item) => (
              <article key={item.id} className="tarjeta-proyecto">
                <div className="contenedor-imagen-proyecto">
                  <img src={item.image} alt={item.alt} className="imagen-proyecto" />
                </div>
                <div className="contenido-proyecto">
                  <h3 className="titulo-proyecto">{item.title}</h3>
                  <p className="descripcion-proyecto">{item.descripcion}</p>
                  <a href="#" className="enlace-proyecto">Ver detalles</a>
                </div>
              </article>
            ))
          ) : (
            <p className="no-proyectos">No hay proyectos en esta categoría</p>
          )}
        </div>
      </section>
      
     
      
      <section className="contacto-portafolio">
        <div className="contenido-contacto">
          <h2>¿Tienes un proyecto en mente?</h2>
          <p>Contáctanos y hablemos sobre cómo podemos ayudarte a hacerlo realidad</p>
          <Boton name="Contactar" enlace="https://dzionix.com/contacto/" />
        </div>
      </section>
    </div>
  );
};

export default Portafolio;
