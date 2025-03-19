import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { getMenuItems } from "../services/wordpressApi";
import "./Menu.css";

const MenuItem = ({ item, handleMenuClick }) => {
  return (
    <li className="menu-item">
      <a href={item.url} onClick={(e) => handleMenuClick(item.url, e)}>
        {item.title}
      </a>
      {item.children && item.children.length > 0 && (
        <ul className="submenu">
          {item.children.map((child) => (
            <MenuItem
              key={child.ID || child.id}
              item={child}
              handleMenuClick={handleMenuClick}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

MenuItem.propTypes = {
  item: PropTypes.shape({
    ID: PropTypes.number,
    id: PropTypes.number,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    children: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  handleMenuClick: PropTypes.func.isRequired,
};

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        setIsLoading(true);
        const items = await getMenuItems(true);
        setMenuItems(items);
      } catch (err) {
        console.error("Error al cargar el menú:", err);
        // Menú de respaldo en caso de error
        setMenuItems([
          { id: 1, title: "Inicio", url: "/inicio/", children: [] },
          {
            id: 2,
            title: "Servicios",
            url: "#",
            children: [
              {
                id: 21,
                title: "Desarrollo de páginas web",
                url: "https://dzionix.com/desarrollo-paginas-web/",
                children: [],
              },
              {
                id: 22,
                title: "Desarrollo de tiendas online",
                url: "https://dzionix.com/desarrollo-de-tiendas-online-y-catalogo-virtuales/",
                children: [],
              },
              {
                id: 23,
                title: "Renovación web",
                url: "https://dzionix.com/rediseno-web-profesional-potencia-tu-sitio-con-un-diseno-moderno-y-agil/",
                children: [],
              },
            ],
          },
          { id: 3, title: "Portafolio", url: "/portafolio/", children: [] },
          { id: 4, title: "Pedir Presupuesto", url: "#", children: [] },
        ]);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMenu();
  }, []);

  const handleMenuClick = (url, e) => {
    if (url === "#") {
      e.preventDefault();
      return;
    }

    const reactRoutes = ["/inicio", "/portafolio"];
    let path;

    try {
      const urlObj = new URL(url);
      path = urlObj.pathname;
    } catch {
      path = url;
    }

    const isReactRoute = reactRoutes.some(
      (route) =>
        path === route || path === `${route}/` || path.startsWith(`${route}?`)
    );

    if (isReactRoute) {
      e.preventDefault();
      const cleanPath = path.startsWith("/") ? path : `/${path}`;
      navigate(cleanPath);
    }
  };

  if (isLoading) {
    return <div>Cargando menú...</div>;
  }

  return (
    <nav className="menu-principal">
      <ul>
        {menuItems.map((item) => (
          <MenuItem
            key={item.id}
            item={item}
            handleMenuClick={handleMenuClick}
          />
        ))}
      </ul>
    </nav>
  );
};

export default Menu;
