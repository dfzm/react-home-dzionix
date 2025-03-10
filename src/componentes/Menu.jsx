import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMenuItems } from "../services/wordpressApi";


const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMenu = async () => {
      const items = await getMenuItems();
      setMenuItems(items);
    };
    
    fetchMenu();
  }, []);

  const handleMenuClick = (url) => {
    // Si la URL contiene "/portafolio", navega internamente con React Router
    if (url.includes("/portafolio")) {
      navigate(url.replace("https://dzionix.com/", "")); // Elimina el dominio
    } else {
      // Redirige a la página externa (WordPress)
      window.location.href = url;
    }
  };

  return (
    <nav>
      <ul>
        {menuItems.map((item) => (
          <li key={item.ID}>
            <a onClick={() => handleMenuClick(item.url)}>{item.title}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Menu;
