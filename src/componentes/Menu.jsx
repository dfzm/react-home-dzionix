import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMenuItems } from "../services/wordpressApi";


const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        setIsLoading(true);
        // Forzamos una actualización del menú (ignorando la caché)
        const items = await getMenuItems(true);
        console.log("Menú obtenido:", items); // Depuración
        setMenuItems(items);
        setIsLoading(false);
      } catch (err) {
        console.error("Error al cargar el menú:", err);
        setError(err.message);
        setIsLoading(false);
      }
    };
    
    fetchMenu();
  }, []);

  const handleMenuClick = (url, e) => {
    console.log("Click en elemento de menú:", url); // Depuración
    
    // Lista de rutas que queremos manejar con React Router (solo las páginas hechas con React)
    const reactRoutes = ['/inicio', '/portafolio'];
    
    // Extraer la ruta de la URL completa
    let path;
    
    try {
      // Intentamos usar URL para extraer el pathname
      const urlObj = new URL(url);
      path = urlObj.pathname;
    } catch (e) {
      // Si no es una URL válida, asumimos que ya es una ruta
      path = url;
    }

    console.log("Ruta extraída:", path); // Depuración
    
    // Verificamos si la ruta debe manejarse internamente con React Router
    const isReactRoute = reactRoutes.some(route => 
      path === route || path === `${route}/` || path.startsWith(`${route}?`)
    );
    
    console.log("¿Es ruta de React?", isReactRoute); // Depuración
    
    if (isReactRoute) {
      // Si es una ruta de React, prevenimos el comportamiento por defecto
      e.preventDefault();
      
      // Navega con React Router
      const cleanPath = path.startsWith('/') ? path : `/${path}`;
      console.log("Navegando a ruta de React:", cleanPath); // Depuración
      navigate(cleanPath);
    } else {
      // Si es una ruta de WordPress, dejamos que el navegador maneje la navegación
      // No prevenimos el comportamiento por defecto, así que el enlace funcionará normalmente
      console.log("Navegación normal a URL de WordPress:", url); // Depuración
    }
  };

  if (isLoading) {
    return <div>Cargando menú...</div>;
  }

  if (error) {
    return <div>Error al cargar el menú: {error}</div>;
  }

  return (
    <nav className="menu-principal">
      <ul>
        {Array.isArray(menuItems) && menuItems.length > 0 ? (
          menuItems.map((item) => (
            <li key={item.ID || item.id}>
              <a 
                href={item.url} 
                onClick={(e) => handleMenuClick(item.url, e)}
              >
                {item.title}
              </a>
              {/* Mostrar el tipo de elemento para depuración */}
              {/* {process.env.NODE_ENV === 'development' && (
                <small style={{ fontSize: '0.7em', color: '#999', marginLeft: '5px' }}>
                  ({item.type || 'link'})
                </small>
              )} */}
            </li>
          ))
        ) : (
          <li>No hay elementos en el menú</li>
        )}
      </ul>
    </nav>
  );
};

export default Menu;
