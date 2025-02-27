/**
 * Transforms the given data object by converting language arrays into XML-like objects.
 * @param obj - The data object to transform.
 */
export const transformLanguages = (obj) => {
  for (const key in obj) {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      if ('language' in obj[key] && Array.isArray(obj[key].language)) {
        // Convertir chaque "language" en un tableau de balises XML
        obj[key].language = obj[key].language.map(lang => ({
          '@id': lang.id,
          '#text': lang.text
        }));
      } else {
        transformLanguages(obj[key]); // Récursion si l'objet contient d'autres objets
      }
    }
  }
};
