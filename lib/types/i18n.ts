export type Locale = 'es' | 'en'
export const locales: Locale[] = ['es', 'en']
export const defaultLocale: Locale = 'es'
export const localePrefix = 'except-default' // documentativo

// Helper para construir hrefs
export function localePath(lang: Locale, path: string) {
  if (lang === 'es') return path          // /servicios
  return `/${lang}${path}`               // /en/services
}