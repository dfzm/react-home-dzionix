import React, { useState } from "react";
import Menu from "./Menu";
import "./Header.css";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header>
      <figure>
        <img
          src="https://dzionix.com/wp-content/uploads/2025/03/LOGO-DZIONIX.png"
          alt="Logo"
        />
      </figure>

      {/* Menú versión escritorio */}
      <div className="menu-ordenador">
        <Menu />
      </div>

      {/* Botón hamburguesa */}
      <button
        className="btn-burger"
        onClick={toggleMenu}
        style={{ display: isMenuOpen ? "none" : null }}
      >
        &#9776;
      </button>

      {/* Botón cerrar */}
      <button
        className="btn-cerrar"
        onClick={toggleMenu}
        style={{ display: isMenuOpen ? "block" : "none" }}
      >
        &times;
      </button>

      {/* Menú versión móvil */}
      <div
        className="menu-movil"
        style={{ display: isMenuOpen ? "block" : "none" }}
      >
        <Menu />
      </div>
    </header>
  );
};

export default Header;
