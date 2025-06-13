/**
 * Utilidades comunes para la aplicación Calendaria
 */

/**
 * Valida si un ID es un número válido dentro de un rango
 * @param {string} id - El ID a validar
 * @param {number} min - Valor mínimo permitido
 * @param {number} max - Valor máximo permitido
 * @returns {boolean} - True si el ID es válido
 */
export function isValidId(id, min = 1, max = Infinity) {
  const numId = parseInt(id);
  return !isNaN(numId) && numId >= min && numId <= max;
}

/**
 * Genera enlaces de navegación seguros
 * @param {number} currentId - ID actual
 * @param {number} totalIds - Total de IDs disponibles
 * @returns {object} - Objeto con prevId y nextId
 */
export function generateNavigationIds(currentId, totalIds) {
  const prevId = currentId === 1 ? totalIds : currentId - 1;
  const nextId = currentId === totalIds ? 1 : currentId + 1;
  
  return { prevId, nextId };
}

/**
 * Formatea el nombre de un día de la semana en español
 * @param {Date} date - Fecha a formatear
 * @returns {string} - Nombre del día capitalizado
 */
export function formatWeekday(date) {
  const weekday = date.toLocaleDateString('es-ES', { weekday: 'long' });
  return weekday.charAt(0).toUpperCase() + weekday.slice(1);
}

/**
 * Genera una descripción amigable para SEO
 * @param {string} type - Tipo de página (aparato, año, vuelta)
 * @param {object} params - Parámetros de la página
 * @returns {string} - Descripción formateada
 */
export function generateSEODescription(type, params) {
  switch (type) {
    case 'aparato':
      return `Explora el Aparato ${params.aparatoId} del calendario LGC.`;
    case 'año':
      return `Calendario LGC para el año ${params.anoId} con sus 22 vueltas.`;
    case 'vuelta':
      return `Vuelta ${params.vueltaId} del año ${params.anoId} en el calendario LGC.`;
    default:
      return 'Sistema de calendario basado en la Lógica General Creativa.';
  }
}

/**
 * Maneja errores de manera consistente
 * @param {Error} error - Error a manejar
 * @param {string} context - Contexto donde ocurrió el error
 */
export function handleError(error, context = 'Unknown') {
  console.error(`[${context}] Error:`, error);
  
  // En producción, aquí podrías enviar el error a un servicio de monitoreo
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'exception', {
      description: `${context}: ${error.message}`,
      fatal: false,
    });
  }
}
