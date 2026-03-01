import { client } from "@/lib/graphql";
import { gql } from "graphql-request";
import Hero from "@/app/components/home/Hero";
import { getRankMathSEO } from "@/lib/seo/seo";
import type { Locale } from "@/lib/types/i18n";
import { withFallback } from "@/lib/utils/i18nFallback"

interface MediaItem { node: { sourceUrl: string; altText: string } }
interface HeroData { titulo: string; subtitulo: string; fondo: MediaItem; textoBoton1: string; enlaceBoton1: string; textoBoton2: string; enlaceBoton2: string }
interface HomeACF { hero: HeroData }
interface HomePageData { page: { translation: { home: HomeACF } } }

const langToWP: Record<Locale, string> = {
  es: 'ES',
  en: 'EN',
}

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang: _ } = await params
  return await getRankMathSEO(2)
}

export default async function Home({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params

  const query = gql`
    query GetHomePage($lang: LanguageCodeEnum!) {
      page(id: 2, idType: DATABASE_ID) {
        translation(language: $lang) {
          home { 
            hero { 
              titulo 
              subtitulo 
              fondo { node { sourceUrl altText } } 
              textoBoton1 
              enlaceBoton1 
              textoBoton2 
              enlaceBoton2 
            } 
          }
        }
      }
    }
  `;

  const data = await client.request<HomePageData>(query, { lang: langToWP[lang] })
    let hero = data.page.translation?.home?.hero

    if (lang !== 'es') {
      const fallback = await client.request<HomePageData>(query, { lang: 'ES' })
      const heroEs = fallback.page.translation?.home?.hero
      if (heroEs) {
        hero = withFallback(
          hero as unknown as Record<string, unknown>,
          heroEs as unknown as Record<string, unknown>
        ) as unknown as HeroData
              }
    }
  return (
    <div className="min-h-screen">
      <Hero hero={hero} lang={lang} />
    </div>
  );
}