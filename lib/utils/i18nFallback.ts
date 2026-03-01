/**
 * Combina un objeto traducido con su fallback en español.
 * Los campos vacíos (null, undefined, '') del objeto traducido
 * se rellenan con el valor del fallback.
 */
export function withFallback<T extends Record<string, unknown>>(
  translated: T,
  fallback: T
): T {
  const result = { ...translated }

  for (const key in fallback) {
    const value = translated[key]
    const fallbackValue = fallback[key]

    if (value && typeof value === 'object' && !Array.isArray(value)) {
      // Recursivo para objetos anidados (como fondo.node.sourceUrl)
      result[key] = withFallback(
        value as Record<string, unknown>,
        fallbackValue as Record<string, unknown>
      ) as T[typeof key]
    } else if (value === null || value === undefined || value === '') {
      result[key] = fallbackValue
    }
  }

  return result
}