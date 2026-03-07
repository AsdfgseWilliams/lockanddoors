import { client } from "@/lib/graphql";
import { gql } from "graphql-request";
import Hero from "@/app/components/home/Hero";
import { getRankMathSEO } from "@/lib/seo/seo";
import type { Locale } from "@/lib/types/i18n";
import { withFallback } from "@/lib/utils/i18nFallback";
import ServiciosDestacados from "@/app/components/home/ServiciosDestacados";
import UrgenciasSection from "@/app/components/home/UrgenciasSection";
import { transformServiciosDestacados } from "@/lib/transformers/servicio.transformer";
import { getDictionary } from "@/lib/getDictionary";

interface MediaItem { node: { sourceUrl: string; altText: string } }

interface OpcionesData {
  telefono: string;
  whatsapp: string;
  email: string;
}

interface HeroData {
  titulo: string; subtitulo: string; fondo: MediaItem;
  textoBoton1: string; enlaceBoton1: string;
  textoBoton2: string; enlaceBoton2: string;
}

type TipoBoton = 'Teléfono' | 'Whatsapp' | 'Email' | 'Formulario' | 'Otro';

interface UrgenciasRaw {
  titulo: string;
  subtitulo: string;
  boton_1: TipoBoton | TipoBoton[];
  textoBoton1?: string;
  enlaceBoton1?: string;
  boton2: TipoBoton | TipoBoton[];
  textoBoton2?: string;
  enlaceBoton2?: string;
}

interface BotonResuelto {
  href: string;
  label: string;
}

interface ServicioDestacado {
  slug: string; title: string; excerpt: string;
}

interface HomeACF {
  hero: HeroData;
  contenido: ContenidoData;
  destacados: { nodes: ServicioDestacado[] };
  urgencias: UrgenciasRaw;
}

interface HomePageData {
  page: { translation: { home: HomeACF } };
  opciones: { paGinaDeOpciones: OpcionesData };
}

interface ContenidoData {
  titulo: string;
  subtitulo: string;
  textoBoton1: string;
}

const langToWP: Record<Locale, string> = { es: 'ES', en: 'EN' }

function resolveBoton(
  tipo: TipoBoton,
  opciones: OpcionesData,
  dict: { llamar: string; whatsapp: string; email: string; presupuesto: string },
  textoCustom?: string,
  enlaceCustom?: string
): BotonResuelto | null {
  switch (tipo) {
    case 'Teléfono':
      return { href: `tel:${opciones.telefono}`, label: `${dict.llamar}: ${opciones.telefono}` }
    case 'Whatsapp': {
      const match = opciones.whatsapp.match(/href="([^"]+)"/)
      const url = match?.[1] ?? `https://wa.me/${opciones.telefono}`
      return { href: url, label: dict.whatsapp }
    }
    case 'Email':
      return { href: `mailto:${opciones.email}`, label: opciones.email }
    case 'Formulario':
      return { href: '#formulario', label: dict.presupuesto }
    case 'Otro':
      if (textoCustom && enlaceCustom) {
        return { href: enlaceCustom, label: textoCustom }
      }
      return null
    default:
      return null
  }
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
            destacados {
              nodes {
                ... on Servicio { slug title excerpt }
              }
            }
            urgencias {
              titulo
              subtitulo
              boton_1
              textoBoton1
              enlaceBoton1
              boton2
              textoBoton2
              enlaceBoton2
            }
            contenido {
              titulo
              subtitulo
              textoBoton1
            }
          }
        }
      }
      opciones: page(id: 17, idType: DATABASE_ID) {
        paGinaDeOpciones {
          telefono
          whatsapp
          email
        }
      }
    }
  `

  const [data, dict] = await Promise.all([
    client.request<HomePageData>(query, { lang: langToWP[lang] }),
    getDictionary(lang),
  ])

  const homeRaw = data.page.translation?.home
  console.log('destacados nodes:', JSON.stringify(homeRaw?.destacados?.nodes, null, 2))
  const opcionesData = data.opciones?.paGinaDeOpciones

  let hero = homeRaw?.hero
  let urgencias = homeRaw?.urgencias

  if (lang !== 'es') {
    const fallback = await client.request<HomePageData>(query, { lang: 'ES' })
    const homeEs = fallback.page.translation?.home

    if (homeEs?.hero) {
      hero = withFallback(
        hero as unknown as Record<string, unknown>,
        homeEs.hero as unknown as Record<string, unknown>
      ) as unknown as HeroData
    }

    if (homeEs?.urgencias) {
      urgencias = withFallback(
        urgencias as unknown as Record<string, unknown>,
        homeEs.urgencias as unknown as Record<string, unknown>
      ) as unknown as UrgenciasRaw
    }
  }

  const boton1 = urgencias && opcionesData
    ? resolveBoton(
        (Array.isArray(urgencias.boton_1) ? urgencias.boton_1[0] : urgencias.boton_1) as TipoBoton,
        opcionesData,
        dict.contacto,
        urgencias.textoBoton1,
        urgencias.enlaceBoton1
      )
    : null

  const boton2 = urgencias && opcionesData
    ? resolveBoton(
        (Array.isArray(urgencias.boton2) ? urgencias.boton2[0] : urgencias.boton2) as TipoBoton,
        opcionesData,
        dict.contacto,
        urgencias.textoBoton2,
        urgencias.enlaceBoton2
      )
    : null

  return (
    <div className="min-h-screen">
      <Hero hero={hero} lang={lang} />
      <ServiciosDestacados lang={lang}
        servicios={transformServiciosDestacados(homeRaw?.destacados?.nodes ?? [])}
        titulo={homeRaw?.contenido?.titulo}
        subtitulo={homeRaw?.contenido?.subtitulo}
        ctaTexto={homeRaw?.contenido?.textoBoton1}
      />
      <UrgenciasSection
        titulo={urgencias?.titulo ?? ''}
        subtitulo={urgencias?.subtitulo ?? ''}
        boton1={boton1}
        boton2={boton2}
      />
    </div>
  )
}