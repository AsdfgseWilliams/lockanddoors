export type Locale = 'es' | 'en'
export const locales: Locale[] = ['es', 'en']
export const defaultLocale: Locale = 'es'
export const localePrefix = 'except-default' // documentativo

// Helper para construir hrefs
export function localePath(lang: Locale, path: string) {
  // No modificar enlaces externos, tel:, mailto:, whatsapp:, etc.
  if (path.startsWith('http') || path.includes(':')) return path
  if (lang === 'es') return path
  return `/${lang}${path}`
}