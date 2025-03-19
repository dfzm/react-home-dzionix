import React from "react";
import BannerHome from "./BannerHome";
import Servicios from "./componentes/home/Servicios";
import PorqueElegirnos from "./componentes/home/PorqueElegirnos";
import Wordpress from "./componentes/home/Wordpress";
import ServiciosComplementarios from "./componentes/home/ServiciosComplementarios";
import Beneficios from "./componentes/home/Beneficios";
import ProcesoCreacion from "./componentes/home/ProcesoCreacion";
import PortafolioHome from "./componentes/home/PortafolioHome";
import Cursor from "./componentes/Cursor";
import Portafolio from "./paginas/Portafolio";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "./componentes/Header";

function App() {
  // Componentes de la página de inicio
  const InicioContent = () => (
    <>
      <BannerHome />
      <Servicios />
      <PorqueElegirnos />
      <Beneficios />
      <Wordpress />
      <ServiciosComplementarios />
      <ProcesoCreacion />
      <PortafolioHome />
    </>
  );

  return (
    <>
      <Router>
        <Header />
        <Routes>
          {/* Redirigir la ruta principal a /inicio/ */}
          <Route path="/" element={<Navigate to="/inicio/" replace />} />

          {/* Ruta de inicio con todo el contenido */}
          <Route path="/inicio/" element={<InicioContent />} />
          <Route path="/inicio" element={<Navigate to="/inicio/" replace />} />

          {/* Ruta para el portafolio */}
          <Route path="/portafolio/" element={<Portafolio />} />
          <Route
            path="/portafolio"
            element={<Navigate to="/portafolio/" replace />}
          />

          {/* 
            Nota: No usamos una ruta catch-all (*) para páginas no encontradas
            ya que queremos que las rutas no manejadas por React Router
            se naveguen normalmente al sitio de WordPress
          */}
        </Routes>
        <Cursor />
      </Router>
    </>
  );
}

export default App;
