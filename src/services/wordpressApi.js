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
  faviconTimestamp: null,
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
  if (
    !forceRefresh &&
    apiCache.menuItems &&
    isCacheValid(apiCache.menuTimestamp)
  ) {
    console.log("Devolviendo menú desde caché");
    return apiCache.menuItems;
  }

  try {
    console.log("Obteniendo menú desde la API");

    // Intentamos obtener los elementos del menú usando el endpoint nativo de WordPress
    const response = await fetch(
      `${WP_API_BASE}/wp/v2/menu-items?per_page=100`
    );

    if (!response.ok) {
      throw new Error(`Error al obtener el menú: ${response.status}`);
    }

    const items = await response.json();
    console.log("Items del menú obtenidos:", items);

    // Organizamos los items en una estructura jerárquica
    const menuMap = new Map();
    const topLevelItems = [];

    // Primero, creamos un mapa con todos los items
    items.forEach((item) => {
      menuMap.set(item.id, {
        id: item.id,
        title: item.title.rendered,
        url: item.url || "#",
        parent: item.parent,
        children: [],
        order: item.menu_order,
      });
    });

    // Luego, organizamos los items en su estructura jerárquica
    items.forEach((item) => {
      const menuItem = menuMap.get(item.id);
      if (item.parent === 0) {
        topLevelItems.push(menuItem);
      } else {
        const parent = menuMap.get(item.parent);
        if (parent) {
          parent.children.push(menuItem);
        }
      }
    });

    // Ordenamos los items por su orden en el menú
    const sortItems = (items) => {
      items.sort((a, b) => a.order - b.order);
      items.forEach((item) => {
        if (item.children.length > 0) {
          sortItems(item.children);
        }
      });
      return items;
    };

    const menuItems = sortItems(topLevelItems);

    // Guardamos en caché
    apiCache.menuItems = menuItems;
    apiCache.menuTimestamp = Date.now();

    return menuItems;
  } catch (error) {
    console.error("Error al obtener el menú:", error);
    throw error;
  }
};

/**
 * Obtiene la información general del sitio (título, descripción, URL, etc.)
 * @param {boolean} forceRefresh - Si es true, ignora la caché y hace una nueva petición
 * @returns {Promise<Object>} - Objeto con la información del sitio
 */
export const getSiteInfo = async (forceRefresh = false) => {
  // Si tenemos datos en caché y no se fuerza la actualización, los devolvemos
  if (
    !forceRefresh &&
    apiCache.siteInfo &&
    isCacheValid(apiCache.siteInfoTimestamp)
  ) {
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
  if (
    !forceRefresh &&
    apiCache.favicon &&
    isCacheValid(apiCache.faviconTimestamp)
  ) {
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
