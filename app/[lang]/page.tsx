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
import ZonasCobertura from "@/app/components/home/ZonasCobertura";
import TestimonialsSection from "@/app/components/home/Testimonios";
import PorQueElegirnos from "@/app/components/home/PorQueElegirnos";
import { FormPresupuesto } from '@/app/components/shared/forms/PresupuestoForm';
import type {
  OpcionesData,
  HomePageData,
  TipoBoton,
  HeroData,
  UrgenciasData,
} from "@/lib/types/wordpress";

// BotonResuelto es local a page.tsx — es el resultado de resolveBoton,
// no un tipo de WordPress, por eso no va en wordpress.ts
interface BotonResuelto {
  href: string;
  label: string;
}

const langToWP: Record<Locale, string> = { es: "ES", en: "EN" };

function resolveBoton(
  tipo: TipoBoton,
  opciones: OpcionesData,
  dict: { llamar: string; whatsapp: string; email: string; presupuesto: string },
  textoCustom?: string,
  enlaceCustom?: string
): BotonResuelto | null {
  switch (tipo) {
    case "Teléfono":
      return { href: `tel:${opciones.telefono}`, label: `${dict.llamar}: ${opciones.telefono}` };
    case "Whatsapp": {
      const match = opciones.whatsapp.match(/href="([^"]+)"/);
      const url = match?.[1] ?? `https://wa.me/${opciones.telefono}`;
      return { href: url, label: dict.whatsapp };
    }
    case "Email":
      return { href: `mailto:${opciones.email}`, label: opciones.email };
    case "Formulario":
      return { href: "#formulario", label: dict.presupuesto };
    case "Otro":
      if (textoCustom && enlaceCustom) {
        return { href: enlaceCustom, label: textoCustom };
      }
      return null;
    default:
      return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  await params;
  return await getRankMathSEO(2);
}

export default async function Home({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;

  const query = gql`
    query GetHomePage($lang: LanguageCodeEnum!) {
      page(id: 2, idType: DATABASE_ID) {
        translation(language: $lang) {
          home {
            hero {
              titulo
              subtitulo
              fondo {
                node {
                  sourceUrl
                  altText
                }
              }
              botonesHero {
                boton_1
                textoBoton1
                enlaceBoton1
                boton2
                textoBoton2
                enlaceBoton2
              }
            }
            destacados {
              nodes {
                ... on Servicio {
                  slug
                  title
                  excerpt
                }
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
            }
            contenido {
              titulo
              subtitulo
              textoBoton1
            }
            titulo
            subtitulo
            ctaTitulo
            ctaSubtitulo
            botonesZonas {
              boton_1
              textoBoton1
              enlaceBoton1
              boton2
              textoBoton2
              enlaceBoton2
            }
            zonasDeCobertura {
              nodes {
                ... on Ubicacion {
                  id
                  title
                  slug
                }
              }
            }
            tituloResenas
            subtituloResenas
            ventajas {
              titulo
              subtitulo
              icono1 { node { sourceUrl altText } }
              ventaja1
              ventaja1Texto
              icono2 { node { sourceUrl altText } }
              ventaja2
              ventaja2Texto
              icono3 { node { sourceUrl altText } }
              ventaja3
              ventaja3Texto
              icono4 { node { sourceUrl altText } }
              ventaja4
              ventaja4Texto
              icono5 { node { sourceUrl altText } }
              ventaja5
              ventaja5Texto
              icono6 { node { sourceUrl altText } }
              ventaja6
              ventaja6Texto
            }
            botonesVentajas {
              boton_1
              textoBoton1
              enlaceBoton1
              boton2
              textoBoton2
              enlaceBoton2
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
  `;

  const [data, dict] = await Promise.all([
    client.request<HomePageData>(query, { lang: langToWP[lang] }),
    getDictionary(lang),
  ]);

  const homeRaw = data.page.translation?.home;
  const opcionesData = data.opciones?.paGinaDeOpciones;

  let hero = homeRaw?.hero;
  let urgencias = homeRaw?.urgencias;

  if (lang !== "es") {
    const fallback = await client.request<HomePageData>(query, { lang: "ES" });
    const homeEs = fallback.page.translation?.home;

    if (homeEs?.hero) {
      hero = withFallback(
        hero as unknown as Record<string, unknown>,
        homeEs.hero as unknown as Record<string, unknown>
      ) as unknown as HeroData;
    }

    if (homeEs?.urgencias) {
      urgencias = withFallback(
        urgencias as unknown as Record<string, unknown>,
        homeEs.urgencias as unknown as Record<string, unknown>
      ) as unknown as UrgenciasData;
    }
  }

  // ── Botones urgencias ──────────────────────────────────────────────────────
  const boton1Urgencias = urgencias && opcionesData
    ? resolveBoton(
        (Array.isArray(urgencias.boton_1)
          ? urgencias.boton_1[0]
          : urgencias.boton_1) as TipoBoton,
        opcionesData,
        dict.contacto,
        urgencias.textoBoton1,
        urgencias.enlaceBoton1
      )
    : null;

  const boton2Urgencias = urgencias && opcionesData
    ? resolveBoton(
        (Array.isArray(urgencias.boton2)
          ? urgencias.boton2[0]
          : urgencias.boton2) as TipoBoton,
        opcionesData,
        dict.contacto,
        urgencias.textoBoton2,
        urgencias.enlaceBoton2
      )
    : null;

  // ── Botones hero ───────────────────────────────────────────────────────────
  const heroBoton1 =
    hero?.botonesHero && opcionesData
      ? resolveBoton(
          (Array.isArray(hero.botonesHero.boton_1)
            ? hero.botonesHero.boton_1[0]
            : hero.botonesHero.boton_1) as TipoBoton,
          opcionesData,
          dict.contacto,
          hero.botonesHero.textoBoton1,
          hero.botonesHero.enlaceBoton1
        )
      : null;

  const heroBoton2 =
    hero?.botonesHero && opcionesData
      ? resolveBoton(
          (Array.isArray(hero.botonesHero.boton2)
            ? hero.botonesHero.boton2[0]
            : hero.botonesHero.boton2) as TipoBoton,
          opcionesData,
          dict.contacto,
          hero.botonesHero.textoBoton2,
          hero.botonesHero.enlaceBoton2
        )
      : null;

  // ── Botones por qué elegirnos ──────────────────────────────────────────────
  const boton1Ventajas =
    homeRaw?.botonesVentajas?.boton_1 && opcionesData
      ? resolveBoton(
          (Array.isArray(homeRaw.botonesVentajas.boton_1)
            ? homeRaw.botonesVentajas.boton_1[0]
            : homeRaw.botonesVentajas.boton_1) as TipoBoton,
          opcionesData,
          dict.contacto,
          homeRaw.botonesVentajas.textoBoton1,
          homeRaw.botonesVentajas.enlaceBoton1
        )
      : null;

  const boton2Ventajas =
    homeRaw?.botonesVentajas?.boton2 && opcionesData
      ? resolveBoton(
          (Array.isArray(homeRaw.botonesVentajas.boton2)
            ? homeRaw.botonesVentajas.boton2[0]
            : homeRaw.botonesVentajas.boton2) as TipoBoton,
          opcionesData,
          dict.contacto,
          homeRaw.botonesVentajas.textoBoton2,
          homeRaw.botonesVentajas.enlaceBoton2
        )
      : null;

  // ── Transformar ventajas a array limpio ────────────────────────────────────
  const ventajas = [
  { icono: homeRaw?.ventajas?.icono1?.node?.sourceUrl, titulo: homeRaw?.ventajas?.ventaja1, texto: homeRaw?.ventajas?.ventaja1Texto },
  { icono: homeRaw?.ventajas?.icono2?.node?.sourceUrl, titulo: homeRaw?.ventajas?.ventaja2, texto: homeRaw?.ventajas?.ventaja2Texto },
  { icono: homeRaw?.ventajas?.icono3?.node?.sourceUrl, titulo: homeRaw?.ventajas?.ventaja3, texto: homeRaw?.ventajas?.ventaja3Texto },
  { icono: homeRaw?.ventajas?.icono4?.node?.sourceUrl, titulo: homeRaw?.ventajas?.ventaja4, texto: homeRaw?.ventajas?.ventaja4Texto },
  { icono: homeRaw?.ventajas?.icono5?.node?.sourceUrl, titulo: homeRaw?.ventajas?.ventaja5, texto: homeRaw?.ventajas?.ventaja5Texto },
  { icono: homeRaw?.ventajas?.icono6?.node?.sourceUrl, titulo: homeRaw?.ventajas?.ventaja6, texto: homeRaw?.ventajas?.ventaja6Texto },
].filter((v): v is { icono: string; titulo: string; texto: string } =>
  Boolean(v.titulo)
);

  return (
    <div className="min-h-screen">
      <Hero
        hero={hero}
        boton1={heroBoton1}
        boton2={heroBoton2}
        lang={lang}
      />
      <ServiciosDestacados
        lang={lang}
        servicios={transformServiciosDestacados(homeRaw?.destacados?.nodes ?? [])}
        titulo={homeRaw?.contenido?.titulo}
        subtitulo={homeRaw?.contenido?.subtitulo}
        ctaTexto={homeRaw?.contenido?.textoBoton1}
      />
      <UrgenciasSection
        titulo={urgencias?.titulo ?? ""}
        subtitulo={urgencias?.subtitulo ?? ""}
        boton1={boton1Urgencias}
        boton2={boton2Urgencias}
      />
      <ZonasCobertura
        titulo={homeRaw?.titulo}
        subtitulo={homeRaw?.subtitulo}
        ctaTitulo={homeRaw?.ctaTitulo}
        ctaSubtitulo={homeRaw?.ctaSubtitulo}
        zonas={homeRaw?.zonasDeCobertura}
        botones={homeRaw?.botonesZonas}
        opciones={opcionesData}
      />
      <TestimonialsSection
        titulo={homeRaw?.tituloResenas}
        subtitulo={homeRaw?.subtituloResenas}
        googleMapsUrl="https://maps.app.goo.gl/WHfRy5BWcMiKggUQ8"
        puntuacion={5.0}
        totalResenas={20}
      />
      <PorQueElegirnos
        titulo={homeRaw?.ventajas?.titulo ?? ""}
        subtitulo={homeRaw?.ventajas?.subtitulo ?? ""}
        ventajas={ventajas}
        boton1={boton1Ventajas}
        boton2={boton2Ventajas}
      />
      <FormPresupuesto servicio="Apertura de puertas urgente" />
    </div>
  );
}