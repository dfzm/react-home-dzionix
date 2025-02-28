import React from "react";
import BannerHome from "./BannerHome";
import Servicios from "./componentes/home/Servicios";
import PorqueElegirnos from "./componentes/home/PorqueElegirnos";
import Wordpress from "./componentes/home/Wordpress";
import ServiciosComplemetarios from "./componentes/home/ServiciosComplementarios";
import Beneficios from "./componentes/home/Beneficios";
import ProcesoCreacion from "./componentes/home/ProcesoCreacion";
import PortafolioHome from "./componentes/home/PortafolioHome";
import Cursor from "./componentes/Cursor";

function App() {
  return (
    <>
      <Cursor />
      <BannerHome />
      <Servicios />
      <PorqueElegirnos />
      <Beneficios />
      <Wordpress />
      <ServiciosComplemetarios />
      <ProcesoCreacion />
      <PortafolioHome />
    </>
  );
}

export default App;
