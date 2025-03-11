/**
 * Servicio para manejar las llamadas a la API de WordPress
 */

// URL base de la API de WordPress
const WP_API_BASE = "https://dzionix.com/wp-json";

// Objeto para almacenar en caché las respuestas de la API
const apiCache = {
  menuItems: null,
  menuTimestamp: null,
  siteInfo: null,
  siteInfoTimestamp: null,
  logo: null,
  logoTimestamp: null,
  favicon: null,
  faviconTimestamp: null
};

// Tiempo de expiración de la caché en milisegundos (5 minutos)
const CACHE_EXPIRATION = 5 * 60 * 1000;

/**
 * Verifica si la caché es válida
 * @param {number} timestamp - Timestamp de cuando se guardó en caché
 * @returns {boolean} - True si la caché es válida, false si no
 */
const isCacheValid = (timestamp) => {
  if (!timestamp) return false;
  return Date.now() - timestamp < CACHE_EXPIRATION;
};

/**
 * Obtiene los elementos del menú principal desde la API de WordPress
 * @param {boolean} forceRefresh - Si es true, ignora la caché y hace una nueva petición
 * @returns {Promise<Array>} - Array con los elementos del menú
 */
export const getMenuItems = async (forceRefresh = false) => {
  // Si tenemos datos en caché y no se fuerza la actualización, los devolvemos
  if (!forceRefresh && apiCache.menuItems && isCacheValid(apiCache.menuTimestamp)) {
    console.log("Devolviendo menú desde caché");
    return apiCache.menuItems;
  }

  try {
    console.log("Obteniendo menú desde la API");
    
    // Intentamos primero con el endpoint personalizado
    let response = await fetch(`${WP_API_BASE}/wp/v2/menu/primary`);
    let menuItems = null;
    
    // Si no existe ese endpoint, intentamos con el endpoint de menus-api
    if (!response.ok) {
      console.log("Endpoint personalizado no encontrado, intentando con menus-api");
      response = await fetch(`${WP_API_BASE}/menus/v1/menus/main-menu`);
    }
    
    // Si tampoco existe, intentamos con el endpoint de wp-api-menus
    if (!response.ok) {
      console.log("Endpoint menus-api no encontrado, intentando con wp-api-menus");
      response = await fetch(`${WP_API_BASE}/wp-api-menus/v2/menus/2`); // Intentamos con ID 2 que es común para menús principales
    }
    
    // Si tampoco existe, intentamos con el endpoint de wp-api-menus sin ID específico
    if (!response.ok) {
      console.log("Endpoint wp-api-menus con ID específico no encontrado, intentando obtener todos los menús");
      response = await fetch(`${WP_API_BASE}/wp-api-menus/v2/menus`);
    }
    
    // Intentamos obtener directamente las páginas publicadas
    if (!response.ok) {
      console.log("No se encontraron endpoints de menú, intentando obtener directamente las páginas");
      response = await fetch(`${WP_API_BASE}/wp/v2/pages?per_page=20&status=publish`);
      
      if (response.ok) {
        const pages = await response.json();
        console.log("Páginas obtenidas:", pages);
        
        // Convertimos las páginas al formato de menú
        menuItems = pages.map(page => ({
          ID: page.id,
          id: page.id,
          title: page.title.rendered,
          url: page.link,
          type: "page"
        }));
      }
    } else {
      // Si alguno de los endpoints anteriores funcionó, procesamos la respuesta
      const data = await response.json();
      
      // Dependiendo del plugin de menú, la estructura puede variar
      if (data.items) {
        menuItems = data.items;
      } else if (Array.isArray(data) && data.length > 0 && data[0].items) {
        menuItems = data[0].items;
      } else if (Array.isArray(data)) {
        menuItems = data;
      } else {
        menuItems = [data]; // Si es un solo objeto, lo convertimos en array
      }
    }
    
    // Si no se pudo obtener el menú de ninguna forma, intentamos con el endpoint de nav_menu_items
    if (!menuItems) {
      console.log("Intentando obtener elementos de menú con endpoint nav_menu_items");
      response = await fetch(`${WP_API_BASE}/wp/v2/nav_menu_items?per_page=20`);
      
      if (response.ok) {
        const navItems = await response.json();
        menuItems = navItems.map(item => ({
          ID: item.id,
          id: item.id,
          title: item.title.rendered,
          url: item.link, // Cambio aquí
          type: item.type
        }));
      }
    }
    
    // Si ninguno de los endpoints funciona, devolvemos un menú de prueba
    if (!menuItems || menuItems.length === 0) {
      console.log("No se pudo obtener el menú desde la API, devolviendo menú de prueba");
      menuItems = [
        { ID: 1, title: "Inicio", url: "/inicio/" },
        { ID: 2, title: "Servicios", url: "https://dzionix.com/servicios/" },
        { ID: 3, title: "Portafolio", url: "/portafolio/" },
        { ID: 4, title: "Contacto", url: "https://dzionix.com/contacto/" }
      ];
    }
    
    console.log("Menú final obtenido:", menuItems);
    
    // Guardamos los datos en caché
    apiCache.menuItems = menuItems;
    apiCache.menuTimestamp = Date.now();
    
    return menuItems;
  } catch (error) {
    console.error("Error fetching menu:", error);
    
    // En caso de error, devolvemos un menú de prueba
    const demoMenu = [
      { ID: 1, title: "Inicio", url: "/inicio/" },
      { ID: 2, title: "Servicios", url: "https://dzionix.com/servicios/" },
      { ID: 3, title: "Portafolio", url: "/portafolio/" },
      { ID: 4, title: "Contacto", url: "https://dzionix.com/contacto/" }
    ];
    
    // Guardamos los datos en caché
    apiCache.menuItems = demoMenu;
    apiCache.menuTimestamp = Date.now();
    
    return demoMenu;
  }
};

/**
 * Obtiene la información general del sitio (título, descripción, URL, etc.)
 * @param {boolean} forceRefresh - Si es true, ignora la caché y hace una nueva petición
 * @returns {Promise<Object>} - Objeto con la información del sitio
 */
export const getSiteInfo = async (forceRefresh = false) => {
  // Si tenemos datos en caché y no se fuerza la actualización, los devolvemos
  if (!forceRefresh && apiCache.siteInfo && isCacheValid(apiCache.siteInfoTimestamp)) {
    return apiCache.siteInfo;
  }

  try {
    const response = await fetch(`${WP_API_BASE}`);
    const data = await response.json();
    
    // Guardamos los datos en caché
    apiCache.siteInfo = data;
    apiCache.siteInfoTimestamp = Date.now();
    
    return data;
  } catch (error) {
    console.error("Error fetching site info:", error);
    return {};
  }
};

/**
 * Obtiene la URL del logo del sitio desde WordPress
 * @param {boolean} forceRefresh - Si es true, ignora la caché y hace una nueva petición
 * @returns {Promise<string>} - URL del logo
 */
export const getSiteLogo = async (forceRefresh = false) => {
  // Si tenemos datos en caché y no se fuerza la actualización, los devolvemos
  if (!forceRefresh && apiCache.logo && isCacheValid(apiCache.logoTimestamp)) {
    return apiCache.logo;
  }

  try {
    // La API REST de WordPress no expone directamente el logo, 
    // pero podemos obtenerlo a través de la API de personalización
    const response = await fetch(`${WP_API_BASE}/wp/v2/settings`);
    const data = await response.json();
    
    // El logo generalmente está en site_logo o custom_logo
    const logoId = data.site_logo || data.custom_logo;
    
    if (logoId) {
      // Si tenemos un ID de logo, obtenemos la URL de la imagen
      const mediaResponse = await fetch(`${WP_API_BASE}/wp/v2/media/${logoId}`);
      const mediaData = await mediaResponse.json();
      
      // Guardamos los datos en caché
      apiCache.logo = mediaData.source_url;
      apiCache.logoTimestamp = Date.now();
      
      return mediaData.source_url;
    }
    
    // Guardamos null en caché para evitar peticiones innecesarias
    apiCache.logo = null;
    apiCache.logoTimestamp = Date.now();
    
    return null;
  } catch (error) {
    console.error("Error fetching site logo:", error);
    return null;
  }
};

/**
 * Obtiene la URL del favicon del sitio
 * @param {boolean} forceRefresh - Si es true, ignora la caché y hace una nueva petición
 * @returns {Promise<string>} - URL del favicon
 */
export const getSiteFavicon = async (forceRefresh = false) => {
  // Si tenemos datos en caché y no se fuerza la actualización, los devolvemos
  if (!forceRefresh && apiCache.favicon && isCacheValid(apiCache.faviconTimestamp)) {
    return apiCache.favicon;
  }

  try {
    // El favicon generalmente se encuentra en el HTML del sitio
    // Podemos usar la API de personalización para intentar obtenerlo
    const response = await fetch(`${WP_API_BASE}/wp/v2/settings`);
    const data = await response.json();
    
    // Algunos temas almacenan el favicon en site_icon
    const iconId = data.site_icon;
    
    if (iconId) {
      // Si tenemos un ID de icono, obtenemos la URL de la imagen
      const mediaResponse = await fetch(`${WP_API_BASE}/wp/v2/media/${iconId}`);
      const mediaData = await mediaResponse.json();
      
      // Guardamos los datos en caché
      apiCache.favicon = mediaData.source_url;
      apiCache.faviconTimestamp = Date.now();
      
      return mediaData.source_url;
    }
    
    // URL predeterminada del favicon
    const defaultFavicon = "https://dzionix.com/favicon.ico";
    
    // Guardamos en caché
    apiCache.favicon = defaultFavicon;
    apiCache.faviconTimestamp = Date.now();
    
    return defaultFavicon;
  } catch (error) {
    console.error("Error fetching favicon:", error);
    
    // URL predeterminada del favicon
    const defaultFavicon = "https://dzionix.com/favicon.ico";
    
    // Guardamos en caché incluso en caso de error
    apiCache.favicon = defaultFavicon;
    apiCache.faviconTimestamp = Date.now();
    
    return defaultFavicon;
  }
};
