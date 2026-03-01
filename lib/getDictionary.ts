import type { Locale } from '@/lib/types/i18n'

const dictionaries = {
  es: () => import('@/lib/dictionaries/es.json').then(m => m.default),
  en: () => import('@/lib/dictionaries/en.json').then(m => m.default),
}

export async function getDictionary(locale: Locale) {
  return dictionaries[locale]?.() ?? dictionaries['es']()
}