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
import Menu from "./componentes/Menu";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Menu />
        <Routes>
          <Route
            path="/"
            element={
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
            }
          />
        </Routes>
      </Router>

      <Cursor />
    </>
  );
}

export default App;
